Try {
    Import-Module posh-git
    Write-Host "Loaded Posh-Git module from Workspace Profile" -ForegroundColor Green
}
Catch {
    Write-Host "Could not load Posh-Git module. Consider downloading it." -ForegroundColor Yellow
}
