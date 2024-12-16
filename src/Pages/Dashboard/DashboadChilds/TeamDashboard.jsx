import React, { useEffect, useState } from 'react';
import { FaTimes, FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import { MdOutlineSwitchAccessShortcutAdd, } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { TbMedicalCrossOff, TbUsersPlus } from 'react-icons/tb';
import AddTeam from '../../../Components/Team/AddTeam';
import TeamCard from '../../../Components/Team/TeamCard';
import { useAPI } from '../../../Context/APIContext';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import Pagination from '../../../Components/Dashboards/ChildDashboard/Pagination';

const TeamDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('monthly');
    const [isModalOpen, setIsModalOpen] = useState(false); // state to control the modal visibility
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(1);
    const { teamDashboard, teamsList } = useAPI();
    const [dataTeams, setDataTeams] = useState({});
    const [cardsData, setCardsData] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const filteredTeams = cardsData?.filter(team =>
        team.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        setLoading(1);
        teamDashboard(selectedOption)
            .then((res) => {
                console.log("Response is :", res);
                setDataTeams(res.data);

            })
            .catch((err) => {
                console.log("Error :", err);

            })
            .finally(() => {
                setLoading(0);
            })

    }, [selectedOption])

    useEffect(() => {
        setLoading(2);
        teamsList(currentPage)
            .then((res) => {
                setCardsData(res?.data?.teamsWithMembers);
                setCurrentPage(res?.data?.currentPage)
                setTotalPages(res?.data?.totalPages);
            })
            .catch((err) => {
                console.log("Eror :", err);

            })
            .finally(() => {
                setLoading(0);
            })
    }, [currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='p-8'>
            {
                loading === 1 ?
                    <LoadingSkeleton />
                    :
                    dataTeams ?
                        <>
                            <div className="flex justify-between">
                                <h1 className='text-2xl font-semibold my-2'>Teams Dashboard</h1>
                                <button
                                    className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 text-center flex items-center'
                                    onClick={toggleModal}
                                >
                                    <TbUsersPlus size={25} style={{ fontWeight: 'bold' }} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                                <RegularCard
                                    data={{
                                        icon: BsMicrosoftTeams,
                                        bgColor: '#0428f28f',
                                        heading: 'Total Teams',
                                        para: dataTeams?.TotalTeams
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: MdOutlineSwitchAccessShortcutAdd,
                                        bgColor: '#2ca907a8',
                                        heading: 'Working Teams',
                                        para: dataTeams?.TotalActiveTeams
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: TbMedicalCrossOff,
                                        bgColor: '#f22c36',
                                        heading: 'Inactive Teams',
                                        para: dataTeams?.TotalInactiveTeams
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <div className="flex justify-between items-center">
                                    <h3 className='text-xl font-semibold'>Teams Reports</h3>
                                    <select
                                        className="border border-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={selectedOption} // Bind the state to the dropdown
                                        onChange={(e) => setSelectedOption(e.target.value)} // Update state on change
                                    >
                                        <option value="all">All</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
                                    <div className="p-4 ">
                                        <h2 className='text-lg ms-3 font-semibold'>
                                            All Teams
                                        </h2>
                                        <RoundedBarChart data={dataTeams?.totalCounts} />
                                    </div>
                                    <div className="p-4 ">
                                        <h2 className='text-lg ms-3 font-semibold'>
                                            Working Teams
                                        </h2>
                                        <RoundedBarChart data={dataTeams?.activeCounts} />
                                    </div>
                                    <div className="p-4 ">
                                        <h2 className='text-lg ms-3 font-semibold'>
                                            Free Teams
                                        </h2>
                                        <RoundedBarChart data={dataTeams?.inactiveCounts} />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className="flex justify-center">
                            No Data Found
                        </div>

            }
            {
                loading === 2
                    ?
                    <LoadingSkeleton />
                    :
                    cardsData?.length > 0 ?

                        <div className="my-4">
                            <div className="flex justify-between">
                                <h3 className='text-xl font-semibold'>Teams List</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="rounded-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-5 pl-3 flex items-center " onClick={() => { setChange(!change) }} style={{ cursor: 'pointer' }} >
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                                {filteredTeams.map((team, index) => (
                                    <TeamCard key={index} team={team} />
                                ))}
                            </div>
                            <div className="my-4">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                        </div>
                        :
                        <div>No Teams Found</div>

            }


            {/* Modal */}
            {isModalOpen && (
                <AddTeam toggleModal={toggleModal} />
            )}
        </div>
    );
}

export default TeamDashboard;
