const SortMenu = ({ onSort }) => {      
    return (
      <div className="bg-white border rounded shadow w-48">
        <ul>
          <li
            onClick={() => onSort("title")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Başlığa
          </li>
          <li
            onClick={() => onSort("date")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Tarihe göre
          </li>
          <li
            onClick={() => onSort("completed")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Yapılma durumuna göre
          </li>
        </ul>
      </div>
    );
  };
  export default SortMenu
  