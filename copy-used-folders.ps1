# Create the used directory
New-Item -ItemType Directory -Path "blueprints/posthog/used" -Force | Out-Null

# Folders to copy (preserving structure)
$foldersToCopy = @(
    @{Source = "blueprints\posthog\posthog\posthog\idl"; Dest = "blueprints\posthog\used\posthog\posthog\idl"},
    @{Source = "blueprints\posthog\posthog\docker\clickhouse\docker-entrypoint-initdb.d"; Dest = "blueprints\posthog\used\posthog\docker\clickhouse\docker-entrypoint-initdb.d"},
    @{Source = "blueprints\posthog\posthog\posthog\user_scripts"; Dest = "blueprints\posthog\used\posthog\posthog\user_scripts"},
    @{Source = "blueprints\posthog\compose"; Dest = "blueprints\posthog\used\compose"},
    @{Source = "blueprints\posthog\posthog\docker\temporal\dynamicconfig"; Dest = "blueprints\posthog\used\posthog\docker\temporal\dynamicconfig"},
    @{Source = "blueprints\posthog\share"; Dest = "blueprints\posthog\used\share"},
    @{Source = "blueprints\posthog\posthog\rust"; Dest = "blueprints\posthog\used\posthog\rust"},
    @{Source = "blueprints\posthog\posthog\docker\postgres-init-scripts"; Dest = "blueprints\posthog\used\posthog\docker\postgres-init-scripts"}
)

# Files to copy (preserving structure)
$filesToCopy = @(
    @{Source = "blueprints\posthog\posthog\docker\clickhouse\config.xml"; Dest = "blueprints\posthog\used\posthog\docker\clickhouse\config.xml"},
    @{Source = "blueprints\posthog\posthog\docker\clickhouse\config.d\default.xml"; Dest = "blueprints\posthog\used\posthog\docker\clickhouse\config.d\default.xml"},
    @{Source = "blueprints\posthog\posthog\docker\clickhouse\users.xml"; Dest = "blueprints\posthog\used\posthog\docker\clickhouse\users.xml"},
    @{Source = "blueprints\posthog\posthog\docker\clickhouse\user_defined_function.xml"; Dest = "blueprints\posthog\used\posthog\docker\clickhouse\user_defined_function.xml"},
    @{Source = "blueprints\posthog\posthog\docker\livestream\configs-hobby.yml"; Dest = "blueprints\posthog\used\posthog\docker\livestream\configs-hobby.yml"},
    @{Source = "blueprints\posthog\posthog\otel-collector-config.dev.yaml"; Dest = "blueprints\posthog\used\posthog\otel-collector-config.dev.yaml"},
    @{Source = "blueprints\posthog\posthog\rust\docker\echo-server\Caddyfile"; Dest = "blueprints\posthog\used\posthog\rust\docker\echo-server\Caddyfile"}
)

Write-Host "Copying folders..."
foreach ($folder in $foldersToCopy) {
    if (Test-Path $folder.Source) {
        $destDir = Split-Path $folder.Dest -Parent
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Copy-Item -Path $folder.Source -Destination $folder.Dest -Recurse -Force
        Write-Host "Copied: $($folder.Source) -> $($folder.Dest)"
    } else {
        Write-Host "Warning: Source not found: $($folder.Source)"
    }
}

Write-Host "`nCopying files..."
foreach ($file in $filesToCopy) {
    if (Test-Path $file.Source) {
        $destDir = Split-Path $file.Dest -Parent
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Copy-Item -Path $file.Source -Destination $file.Dest -Force
        Write-Host "Copied: $($file.Source) -> $($file.Dest)"
    } else {
        Write-Host "Warning: Source not found: $($file.Source)"
    }
}

Write-Host "`nDone! All used folders and files have been copied to blueprints/posthog/used"

