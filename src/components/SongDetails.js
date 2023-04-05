import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";
import Message from "./Message";

const SongDetails = ({ search, lyric, bio }) => {
  //Mientras Lyric o bio no tengan valor retorna nulo
  if (!lyric || !bio) return null;

  return (
    <>
      {/*Condicional render: name viene del metodo abortCotnroller de hel si se cumple mandamos el mensaje de error*/}
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: no existe la canción: "${search.song}"`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric title ={search.song} lyrics={lyric.lyrics}/>
      )}

      {/*Condicional render: si bio.artists tiene datos renderizamos songArtist sino mandamos el mensajde de eror*/}
      {bio.artists ? (
        <SongArtist artist = {bio.artists[0]} />
      ) : (
        <Message
          msg={`Error: no existe el interprete: "${search.artist}"`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
