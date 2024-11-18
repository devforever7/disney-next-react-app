import { CharacterCard } from '../CharacterCard/CharacterCard';
import styles from './CharacterGrid.module.css';
import { ICharacter } from '@/lib/api/types';

interface ICharacterGridProps {
  characters: Array<ICharacter>;
}

export function CharacterGrid({ characters }: ICharacterGridProps) {
  return (
    <div className={styles.grid}>
      {characters.map((character) => {
        if (!character?._id || !character.name || !character.imageUrl) {
          return null;
        }

        return (
          <CharacterCard
            key={character._id}
            id={character._id}
            name={character.name}
            imageUrl={character.imageUrl}
            films={character.films}
          />
        );
      })}
    </div>
  );
}
