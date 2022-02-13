param (
  [Parameter(Position = 0, Mandatory = $true)]
  [ValidateSet('core', 'forms', 'router')]
  [string]$library,

  [Parameter(Position = 1, Mandatory = $true)]
  [ValidateSet('piLib', 'decoderLib', 'decoderBookingApp', 'decoderAgendaApp')]
  [string[]]$targetApps,

  [ValidateSet('minor', 'build')]
  [string]$incrementVersionPart = 'build',

  [Switch]$noIncrementVersion
)

$libOrg = "ng-ext"
$targetPaths = @{
  piLib             = "../../../repos-poste/decoder/common-app/client-lib-pi"
  decoderLib        = "../../../repos-poste/decoder/common-app/client-lib-decoder"
  decoderBookingApp = "../../../repos-poste/decoder/booking-app"
  decoderAgendaApp  = "../../../repos-poste/decoder/agenda-app"
}

function Update-LibVersion([string]$VersionString) {
  if ($noIncrementVersion -eq $true) {
    return $VersionString
  }
  else {
    $v = [System.Version]::Parse($VersionString)

    $newMinor = $v.Minor
    $newBuild = $v.Build
    if ($incrementVersionPart -eq 'minor') {
      $newMinor += 1
      $newBuild = 0
    }
    elseif ($incrementVersionPart -eq 'build') {
      $newBuild += 1
    }

    return "$($v.Major).$newMinor.$newBuild"
  }
}

$libPackageFileName = ".\projects\$libOrg\$library\package.json"
$libPackageJson = Get-Content -Path $libPackageFileName -Raw | ConvertFrom-Json

Write-Host "@$libOrg/$library library version $($libPackageJson.version) -> " -NoNewline -ForegroundColor Yellow -BackgroundColor DarkBlue
$libPackageJson.version = Update-LibVersion -VersionString $libPackageJson.version
Write-Host $libPackageJson.version -ForegroundColor Yellow -BackgroundColor DarkBlue


Write-Host "Updating $libPackageFileName..." -ForegroundColor Yellow -BackgroundColor DarkBlue
Set-Content -Path $libPackageFileName -Value $($libPackageJson | ConvertTo-Json)


Write-Host "Building library..." -ForegroundColor Yellow -BackgroundColor DarkBlue
. npm run publish-$library

foreach ($targetApp in $targetApps) {
  Write-Host "----"

  $libSourceFileName = "$libOrg-$library-$($libPackageJson.version).tgz"
  $libSourceFilePath = ".\dist\$libOrg\$library\$libSourceFileName"
  $targetAppRoot = $($targetPaths.$targetApp)
  $targetLibrariesFolder = "$targetAppRoot\libraries"
  Write-Host "Copying library $libSourceFilePath to $targetLibrariesFolder..." -ForegroundColor Yellow -BackgroundColor DarkBlue
  Remove-Item -Path "$targetLibrariesFolder\$libOrg-$library*.tgz"
  Copy-Item -Path $libSourceFilePath -Destination $targetLibrariesFolder


  $targetPackageFileName = "$targetAppRoot\package.json"
  Write-Host "Updating $targetPackageFileName..." -ForegroundColor Yellow -BackgroundColor DarkBlue
  $targetPackageJson = Get-Content -Path $targetPackageFileName -Raw | ConvertFrom-Json
  if ($null -ne $targetPackageJson.dependencies."@$libOrg/$library") {
    $targetPackageJson.dependencies."@$libOrg/$library" = "file:libraries/$libSourceFileName"
  }
  elseif ($null -ne $targetPackageJson.devDependencies."@$libOrg/$library") {
    $targetPackageJson.devDependencies."@$libOrg/$library" = "file:libraries/$libSourceFileName"
  }
  Set-Content -Path $targetPackageFileName -Value $($targetPackageJson | ConvertTo-Json)


  Write-Host "Installing @$libOrg/$library on $targetAppRoot" -ForegroundColor Yellow -BackgroundColor DarkBlue
  Push-Location $targetAppRoot
  . npm i @$libOrg/$library -f
  Pop-Location

  if ($noIncrementVersion -eq $true) {
    Write-Host "Removing $targetAppRoot\.angular\cache" -ForegroundColor Yellow -BackgroundColor DarkBlue
    Remove-Item "$targetAppRoot\.angular\cache" -Recurse -Force -ErrorAction Ignore
  }
}

Write-Host "Done"
