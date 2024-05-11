import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();
  const { address } = body;
  const res = await axios.get(`https://apis.map.qq.com/jsapi?qt=geoc&addr=${address}&key=UGMBZ-CINWR-DDRW5-W52AK-D3ENK-ZEBRC&output=jsonp&pf=jsapi&ref=jsapi&cb=qq.maps._svcb2.geocoder0`);

  const regex = /qq\.maps\._svcb2\.geocoder0\((.*?)\)/;
  const str = res.data.replaceAll('\n', '');
  const match = regex.exec(str);
  if (match) {
    const geocoderInfo = JSON.parse(match[1]);
    const { detail: { pointx, pointy } } = geocoderInfo;
    return Response.json({
      code: 200,
      data: {
        x: pointx,
        y: pointy
      },
      msg: 'success'
    })
  };

  return Response.json({
    code: 200,
    data: {},
    msg: 'success'
  });
};