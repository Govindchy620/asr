import React from 'react';
import { CRMProvider } from './context/CRMContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/views/MainContent';
import { ZiaDrawer } from './components/modals/ZiaDrawer';
import { CreateRecordModal } from './components/modals/CreateRecordModal';
import { CreateReportModal } from './components/modals/CreateReportModal';
import { CreateDashboardModal } from './components/modals/CreateDashboardModal';

function CRMApp() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* 1. Top Bar / Header */}
      <Header />

      {/* 2. Body: Left Navigation Sidebar + Dynamic Main Content Pane */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-[#0b0f17]">
          <MainContent />
        </main>
      </div>

      {/* 3. Global Overlays & Modals */}
      <ZiaDrawer />
      <CreateRecordModal />
      <CreateReportModal />
      <CreateDashboardModal />
    </div>
  );
}

function App() {
  return (
    <CRMProvider>
      <CRMApp />
    </CRMProvider>
  );
}

export default App;

