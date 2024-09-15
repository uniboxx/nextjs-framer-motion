import { createContext, useState } from 'react';
import cookingImg from '../assets/cooking.png';
import constructingImg from '../assets/constructing.png';

const initialState = [
  {
    title: 'Learn React',
    description: 'Learn all about React',
    deadline: new Date(),
    image: { src: cookingImg, alt: 'Person cooking a meal.' },
    id: 'c1',
    status: 'active',
  },
  {
    title: 'Learn how to animate with React',
    description: 'Learn all about React',
    deadline: new Date(),
    image: { src: constructingImg, alt: 'Person working on some furniture.' },
    id: 'c2',
    status: 'active',
  },
];

export const ChallengesContext = createContext({
  challenges: initialState,
  addChallenge: () => {},
  updateChallengeStatus: () => {},
});

export default function ChallengesContextProvider({ children }) {
  const [challenges, setChallenges] = useState(initialState);

  function addChallenge(challenge) {
    setChallenges(prevChallenges => [
      { ...challenge, id: Math.random().toString(), status: 'active' },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId) {
    setChallenges(prevChallenges =>
      prevChallenges.filter(challenge => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId, newStatus) {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
