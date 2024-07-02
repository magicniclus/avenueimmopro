const ListLink = () => {
  return (
    <div className="p-12 w-full md:w-4/12 flex flex-col justify-between border border-gray-200 rounded-md">
      <h2 className="text-xl text-gray-900 font-semibold">
        Prendre vos rendez-vous
      </h2>
      <a href="#" className="text-gray-700 mt-3">
        Structurer votre discours
      </a>
      <a href="#" className="text-gray-700 mt-3">
        Prenre votre R1
      </a>
      <a href="#" className="text-gray-700 mt-3">
        Répondre au objections
      </a>
      <h2 className="text-xl text-gray-900 mt-10 font-semibold">
        Obtenir le mandat
      </h2>
      <a href="#" className="text-gray-700 mt-3">
        Structurer votre discours
      </a>
      <a href="#" className="text-gray-700 mt-3">
        Présentation du mandat
      </a>
      <a href="#" className="text-gray-700 mt-3">
        Répondre au objections
      </a>
    </div>
  );
};

export default ListLink;
