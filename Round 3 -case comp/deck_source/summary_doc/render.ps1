param([string]$Docx, [string]$Pdf)
$ErrorActionPreference = 'Stop'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  $doc = $word.Documents.Open($Docx, $false, $true)
  $pages = $doc.ComputeStatistics(2)
  $doc.ExportAsFixedFormat($Pdf, 17)
  $doc.Close($false)
  Write-Output "PAGES=$pages"
} finally {
  $word.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
