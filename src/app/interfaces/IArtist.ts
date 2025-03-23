import {IAlbumHome} from './IAlbumHome';

export interface IArtist{
  id:number
  name:string
  albums: IAlbumHome[]
}
