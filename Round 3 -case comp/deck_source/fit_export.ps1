param([string]$pptx, [string]$pdf, [string]$report)
$job = Start-Job -ScriptBlock {
  param($pptx, $pdf, $report)
  $app = New-Object -ComObject PowerPoint.Application
  $p = $app.Presentations.Open($pptx, -1, 0, 0)
  $out = New-Object System.Collections.ArrayList
  foreach ($s in $p.Slides) {
    foreach ($sh in $s.Shapes) {
      if ($sh.HasTable -eq -1) {
        [void]$out.Add(("{0}`tTABLE`t{1}`tbottom={2:N2}in" -f $s.SlideIndex, $sh.Name, (($sh.Top + $sh.Height) / 72)))
        $tbl = $sh.Table
        for ($r = 1; $r -le $tbl.Rows.Count; $r++) {
          for ($c = 1; $c -le $tbl.Columns.Count; $c++) {
            $cell = $tbl.Cell($r, $c)
            $tf = $cell.Shape.TextFrame2
            if ($tf.HasText -eq -1) {
              $bw = $tf.TextRange.BoundWidth
              $avW = $tbl.Columns.Item($c).Width - $tf.MarginLeft - $tf.MarginRight
              $lines = $tf.TextRange.Lines().Count
              if ($bw -gt $avW + 1) { [void]$out.Add(("{0}`tCELLW`tr{1}c{2}`t{3:N1}/{4:N1}`t{5}" -f $s.SlideIndex, $r, $c, $bw, $avW, $tf.TextRange.Text)) }
            }
          }
        }
        continue
      }
      if ($sh.HasTextFrame -eq -1) {
        $tf = $sh.TextFrame2
        if ($tf.HasText -eq -1) {
          $tr = $tf.TextRange
          $bh = $tr.BoundHeight; $bw = $tr.BoundWidth
          $avail = $sh.Height - $tf.MarginTop - $tf.MarginBottom
          $availW = $sh.Width - $tf.MarginLeft - $tf.MarginRight
          $txt = ($tr.Text -replace "[`r`n`v]", " / ")
          if ($txt.Length -gt 70) { $txt = $txt.Substring(0, 70) }
          if ($bh -gt $avail + 1.5 -or $bw -gt $availW + 1.5) {
            [void]$out.Add(("{0}`tOVER`th {1:N1}/{2:N1}`tw {3:N1}/{4:N1}`t{5}" -f $s.SlideIndex, $bh, $avail, $bw, $availW, $txt))
          }
        }
      }
    }
  }
  $out | Out-File -Encoding utf8 $report
  $p.SaveAs($pdf, 32)
  $p.Close()
  $app.Quit()
  "done"
} -ArgumentList $pptx, $pdf, $report
$r = Wait-Job $job -Timeout 300
if ($job.State -ne 'Completed') { "job state: " + $job.State }
Receive-Job $job
Remove-Job $job -Force
