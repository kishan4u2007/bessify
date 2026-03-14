import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/auth/LoginPage";
import SearchPage from "./pages/search/SearchPage";
import LandingPage from "./pages/landing/LandingPage";
import ArtistPage from "./pages/artist/ArtistPage";
import LibraryPage from "./pages/library/LibraryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import LikedSongsPage from "./pages/liked/LikedSongsPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/admin' element={<AdminPage />} />

				<Route element={<MainLayout />}>
					<Route path='/home' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='/artists/:artistName' element={<ArtistPage />} />
					<Route path='/library' element={<LibraryPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/settings' element={<SettingsPage />} />
					<Route path='/notifications' element={<NotificationsPage />} />
					<Route path='/liked' element={<LikedSongsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
