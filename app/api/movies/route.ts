import { fetchMovies } from "@/lib/dal";

import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const pageNumber = Number(searchParams.get("pageNumber"));
  if (pageNumber <= 0 || !Number.isInteger(pageNumber) || pageNumber > 500) {
    return NextResponse.json(
      { message: "invalid page number" },
      { status: 400 },
    );
  }

  try {
    const res = await fetchMovies({ pageNumber });
    return NextResponse.json({
      movies: res,
    });
  } catch {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 502 },
    );
  }
};
