import {IArtist} from './IArtist';
import {IGenre} from './IGenre';
import {ITag} from './ITag';
import {IReview} from './IReview';
import {ITrack} from './ITrack';

export interface IAlbum {
  id: number
  title: string
  artists: IArtist[]
  genre: IGenre
  releaseDate: Date
  cover: string
  tags: ITag[]
  reviews: IReview[]
  tracks: ITrack[]
}
