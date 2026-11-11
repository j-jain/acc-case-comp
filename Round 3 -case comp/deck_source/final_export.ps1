param([string]$src, [string]$outPptx, [string]$outPdf, [string]$report)
$job = Start-Job -ScriptBlock {
  param($src, $outPptx, $outPdf, $report)
  $app = New-Object -ComObject PowerPoint.Application
  $p = $app.Presentations.Open($src, -1, 0, 0)
  $out = New-Object System.Collections.ArrayList
  $minSize = 999
  foreach ($s in $p.Slides) {
    foreach ($sh in $s.Shapes) {
      if ($sh.HasTextFrame -eq -1 -and $sh.TextFrame2.HasText -eq -1) {
        foreach ($run in $sh.TextFrame2.TextRange.Runs()) {
          if ($run.Text.Trim().Length -gt 0 -and $run.Font.Size -lt $minSize) { $minSize = $run.Font.Size; $minWhere = "slide $($s.SlideIndex): $($run.Text)" }
        }
        $tf = $sh.TextFrame2; $tr = $tf.TextRange
        if ($tr.BoundHeight -gt ($sh.Height - $tf.MarginTop - $tf.MarginBottom + 1.5)) {
          [void]$out.Add(("{0}`tOVER-H`t{1:N1}/{2:N1}`t{3}" -f $s.SlideIndex, $tr.BoundHeight, ($sh.Height - $tf.MarginTop - $tf.MarginBottom), ($tr.Text -replace "[`r`n`v]", " / ")))
        }
      }
      if ($sh.HasTable -eq -1) {
        $tbl = $sh.Table
        for ($r = 1; $r -le $tbl.Rows.Count; $r++) { for ($c = 1; $c -le $tbl.Columns.Count; $c++) {
          $tr = $tbl.Cell($r, $c).Shape.TextFrame2.TextRange
          foreach ($run in $tr.Runs()) { if ($run.Text.Trim().Length -gt 0 -and $run.Font.Size -lt $minSize) { $minSize = $run.Font.Size; $minWhere = "slide $($s.SlideIndex) table: $($run.Text)" } }
        } }
        [void]$out.Add(("{0}`tTABLE bottom {1:N2} in" -f $s.SlideIndex, (($sh.Top + $sh.Height) / 72)))
      }
      if ($sh.HasChart -eq -1) { [void]$out.Add(("{0}`tCHART ok" -f $s.SlideIndex)) }
    }
  }
  [void]$out.Add("MIN FONT SIZE (text and tables): $minSize pt at $minWhere")
  [void]$out.Add("SLIDES: $($p.Slides.Count)")
  $out | Out-File -Encoding utf8 $report
  $p.SaveAs($outPptx, 24, -1)   # ppSaveAsOpenXMLPresentation, embed TrueType fonts
  $p.SaveAs($outPdf, 32)        # ppSaveAsPDF
  $p.Close()
  $app.Quit()
  "done"
} -ArgumentList $src, $outPptx, $outPdf, $report
Wait-Job $job -Timeout 300 | Out-Null
if ($job.State -ne 'Completed') { "job state: " + $job.State }
Receive-Job $job
Remove-Job $job -Force
