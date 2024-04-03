import { read, utils } from 'xlsx';
import type { Sheet } from 'xlsx';

export async function POST(req: Request) {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!data) return Response.json({ code: 400, msg: 'need file' })

  const bytes = await file.arrayBuffer();
  const excelFile = read(bytes, { type: 'array' });

  const { Sheets, SheetNames } = excelFile;
  console.log('Sheets', Sheets)

  const jsonData: Record<string, any> = {};
  SheetNames.forEach(name => {
    jsonData[name] = transSheet2Json(Sheets[name])
  })

  return Response.json({
    code: 200,
    data: jsonData,
    msg: 'success'
  })
}

function transSheet2Json(Sheet: Sheet) {
  return utils.sheet_to_json(Sheet);
}