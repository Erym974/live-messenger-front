import React, { useEffect } from "react";
import useFriends from "../../Hooks/useFriends";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";

export const NoGroupYet = () => {
  const { friendsIsLoading, friends } = useFriends();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(friendsIsLoading);
  }, [friendsIsLoading])

  return (
    <>
      {friendsIsLoading && <Loader />}
      {!friendsIsLoading && (
        <>
          {friends?.length <= 0 ? (
            <section id="no-group-yet" className="d-flex f-c aic jcc">
              <h2 className="mt-5">Il semble que tu n'aies pas encore d'amis !</h2>
              <p className="mt-2 text-dark">
                Pour commencer à discuter, tu peux ajouter des amis en cliquant
                sur le bouton ci-dessous.
              </p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => {
                  navigate("/settings/friends");
                }}
              >
                Ajouter des amis
              </button>
            </section>
          ) : (
            <section id="no-group-yet" className="d-flex f-c aic jcc">
              <h2 className="mt-5">
                Il semble que tu n'aies pas encore de conversation !
              </h2>
              <p className="mt-2 text-dark">
                Pour commencer à discuter, tu peux créer un groupe avec un ou
                plusieurs de tes amis
              </p>
              <ul>
                {friends.map((friend, index) => <li key={index}>
                  {friend?.friend?.fullname}
                </li>)}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
};
