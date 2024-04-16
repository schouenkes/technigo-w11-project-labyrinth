import { useLabyrinthStore } from "../stores/useLabyrinthStore";
import { useState } from "react";

export const StartGame = () => {
  const setUsername = useLabyrinthStore((state) => state.setUsername);
  const [gameData, setGameData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = useLabyrinthStore.getState().username;

    try {
      const response = await fetch("https://labyrinth.technigo.io/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error("Couldn't start the game");
      }
      const data = await response.json();
      console.log("response from API", data);
      setGameData(data);
    } catch (error) {
      console.log("there was a problem with the fetch operation", error);
    }
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="Type your name" onChange={(event) => setUsername(event.target.value)} />
        <button type="submit" onClick={handleSubmit}>
          Start the game!
        </button>
      </form>
      {gameData && (
        <div>
          <p>{gameData.description}</p>
          <ul>
            {gameData.actions.map((action, index) => (
              <p key={index}>
                {action.description} {action.type}
                {action.direction}
              </p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
