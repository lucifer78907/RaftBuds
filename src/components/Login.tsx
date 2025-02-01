import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import RaftBudsLogo from '../assets/48.svg'
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";
import Profile from "./Profile";


function Login() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const { loginWithRedirect } = useAuth0();
    const { logout, isAuthenticated } = useAuth0();
    const { user, isLoading } = useAuth0();

    const handleLogin = () => { loginWithRedirect() }

    const handleLogout = () => { logout({ logoutParams: { returnTo: window.location.origin } }) }

    const handleModalClose = () => { setShowModal(false) }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="p-6 flex items-center justify-between">
            {isAuthenticated && user &&
                <Modal isOpen={showModal} onClose={handleModalClose} title={'Profile'}>
                    <Profile name={user?.name || ''} email={user?.email || 'No email registered'} picture={user?.picture || 'No picture'} handleLogout={handleLogout} />
                </Modal>
            }
            <header className="flex gap-2 items-center">
                <img src={RaftBudsLogo} alt="RaftBuds" className="w-12 h-12" />
                <h2 className="text-2xl text-orange-500 font-medium">RaftBuds</h2>
            </header>
            <div className="flex gap-4 items-center">
                {!isAuthenticated &&
                    <button onClick={handleLogin} className="px-4 py-2 text-2xl rounded-xl shadow-md font-medium bg-orange-500 text-neutral-50">Login</button>
                }
                {isAuthenticated && user &&
                    <article className="flex gap-4 items-center cursor-pointer" onClick={() => setShowModal(true)}>
                        <header className="flex flex-col gap-2 items-center"
                        >
                            <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full shadow-md" />
                            <h3 className="text-base font-medium text-neutral-700">{user.name}</h3>
                        </header>
                    </article>
                }
            </div>

        </section >

    )
}

export default Login