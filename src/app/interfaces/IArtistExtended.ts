import {IAlbumHome} from './IAlbumHome';
import {IAlbum} from './IAlbum';
import {IArtist} from './IArtist';

export interface IArtistExtended extends IArtist{
  albums: IAlbumHome[]
}
