export interface IAlbumRequest{
  albumId: number,
  title: string,
  artistIds: number[],
  releaseDate: Date,
  genreId: number,
  tags: string[]

}
