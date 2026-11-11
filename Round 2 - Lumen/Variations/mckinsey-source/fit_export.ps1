param([string]$Pptx, [string]$Pdf)
# Opens the deck in PowerPoint, reports every text frame's fill (bound vs box), exports PDF.
$ErrorActionPreference = 'Stop'
$wasRunning = @(Get-Process POWERPNT -ErrorAction SilentlyContinue).Count -gt 0
$app = New-Object -ComObject PowerPoint.Application
$ppPid = (Get-Process POWERPNT | Sort-Object StartTime | Select-Object -Last 1).Id
"POWERPNT pid=$ppPid wasRunning=$wasRunning"
try {
  $pres = $app.Presentations.Open($Pptx, -1, 0, 0)
  $sw = $pres.PageSetup.SlideWidth; $sh = $pres.PageSetup.SlideHeight
  foreach ($s in $pres.Slides(1).Shapes) {
    if ($s.Left -lt 0 -or $s.Top -lt 0 -or ($s.Left + $s.Width) -gt ($sw + 0.5) -or ($s.Top + $s.Height) -gt ($sh + 0.5)) {
      "OUTSIDE  $($s.Name)"
    }
    if (-not $s.HasTextFrame) { continue }
    $tf = $s.TextFrame2
    if (-not $tf.HasText) { continue }
    $tr = $tf.TextRange
    $availH = $s.Height - $tf.MarginTop - $tf.MarginBottom
    $availW = $s.Width - $tf.MarginLeft - $tf.MarginRight
    $flag = ''
    if ($tr.BoundHeight -gt $availH + 0.75) { $flag += ' OVER-H' }
    if ($tr.BoundWidth -gt $availW + 0.75) { $flag += ' OVER-W' }
    $t = $tr.Text -replace "[\r\n]+", ' / '
    if ($t.Length -gt 38) { $t = $t.Substring(0, 38) }
    '{0,-14} lines={1,2} h={2,6:N1}/{3,6:N1} w={4,6:N1}/{5,6:N1}{6}  {7}' -f $s.Name, $tr.Lines().Count, $tr.BoundHeight, $availH, $tr.BoundWidth, $availW, $flag, $t
  }
  $pres.SaveAs($Pdf, 32)
  "PDF saved: $Pdf"
  $pres.Close()
} finally {
  if (-not $wasRunning) { $app.Quit() }
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null
}
