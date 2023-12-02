import './CashOutList.css';
import React from 'react';
import TopNavigation from "../../top-navigation/TopNavigation";

export function CashOutList() {
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <div className={"mt-10vh"}>
                <div className={"fb fb-row mt-5"}>
                    <label>
                        <span>Search user:</span>
                        <input className={"ml-2"} type="text" value={searchTerm} onChange={handleSearchChange} />
                    </label>
                </div>
            </div>
            Cash Out List
        </div>
    )
}
