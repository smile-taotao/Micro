/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Dashboard from './pages/Dashboard';
import Recording from './pages/Recording';
import MarketingLog from './pages/MarketingLog';
import MarketingForm from './pages/MarketingForm';
import Assistant from './components/Assistant';
import RecordingWidget from './components/RecordingWidget';
import { useAppContext } from './context/AppContext';

export default function App() {
  const { currentPage, setCurrentPage } = useAppContext();

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden text-sm">
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'recording' && <Recording onBack={() => setCurrentPage('dashboard')} />}
      {currentPage === 'marketingLog' && <MarketingLog onBack={() => setCurrentPage('dashboard')} onNavigate={setCurrentPage} />}
      {currentPage === 'marketingForm' && <MarketingForm onBack={() => setCurrentPage('marketingLog')} />}
      
      {/* Global Overlays */}
      <Assistant />
      <RecordingWidget />
    </div>
  );
}

