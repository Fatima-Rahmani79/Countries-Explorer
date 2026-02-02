
import { Search } from "lucide-react";
export default function SearchBar({searchTerm, setSearchTerm}) {

    return (
        <div className="search">
            <span>
                <Search size={20} />
            </span>
            <input 
            type="text"
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}} 
            className="search_input" 
            placeholder="Search for a country..." 
            />
        </div>
    );
}