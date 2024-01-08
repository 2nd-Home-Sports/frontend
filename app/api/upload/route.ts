import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        id,
        image
    } = body;

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`;
    axios.post(url, {
        ref: 'bars',
        refId: id,
        field: 'media',
        files: image
    }).then((res)=> {
        return NextResponse.json({success: 'ok'});
    } )
    .catch(()=> {
        return NextResponse.json({success: 'no'});
    })
}