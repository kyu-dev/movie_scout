import React from 'react';

const CastSection = ({ casting }) => {
  if (!casting) return null;

  const director = casting.crew?.find((member) => member.job === "Director");

  return (
    <>
      {director && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Réalisateur</h3>
          <p className="text-gray-300">{director.name || "Inconnu"}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Acteurs principaux</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {casting.cast?.slice(0, 4).map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={actor.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <p className="text-center text-gray-300">
                {actor.name}
              </p>
              <p className="text-center text-sm text-gray-400">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CastSection;
