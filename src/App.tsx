import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NeedHelpWizard } from './components/NeedHelpWizard';
import { CompareMethod } from './components/CompareMethod';
import { FeaturedGuides } from './components/FeaturedGuides';
import { FaqAccordion } from './components/FaqAccordion';
import { GuidesLibraryView } from './components/GuidesLibraryView';
import { FeaturesView } from './components/FeaturesView';
import { PrivacyView } from './components/PrivacyView';
import { SosModal } from './components/SosModal';
import { SelfAssessmentModal } from './components/SelfAssessmentModal';
import { Footer } from './components/Footer';

type TabType = 'home' | 'guides' | 'features' | 'privacy';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Sync hash routing on initial load and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'guides' || hash.startsWith('guide-')) {
        setActiveTab('guides');
        if (hash.startsWith('guide-')) {
          setSelectedArticleId(hash.replace('guide-', ''));
        }
      } else if (hash === 'features') {
        setActiveTab('features');
      } else if (hash === 'privacy') {
        setActiveTab('privacy');
      } else if (hash === 'sos') {
        setIsSosOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = tab;
    }
  };

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    setActiveTab('guides');
    window.location.hash = `guide-${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b101b] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200" dir="rtl">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* Main Content Areas based on 3-Layer Architecture */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onOpenSos={() => setIsSosOpen(true)}
              onOpenAssessment={() => setIsAssessmentOpen(true)}
              onExploreGuides={() => handleNavigate('guides')}
            />

            {/* Block 1: الان چه کمکی می‌خواهی؟ */}
            <NeedHelpWizard
              onOpenSos={() => setIsSosOpen(true)}
              onReadArticle={handleOpenArticle}
            />

            {/* Block 2: چرا روزشمارهای معمولی شکست می‌خورند؟ */}
            <CompareMethod />

            {/* Block 3: ۳ راهنمای پرمخاطب */}
            <FeaturedGuides
              onOpenArticle={handleOpenArticle}
              onViewAllGuides={() => handleNavigate('guides')}
            />

            {/* Block 4: پرسش‌های کلیدی تاشو */}
            <FaqAccordion />
          </>
        )}

        {activeTab === 'guides' && (
          <GuidesLibraryView
            initialArticleId={selectedArticleId}
            onClearInitialArticle={() => setSelectedArticleId(null)}
            onOpenSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'features' && (
          <FeaturesView
            onOpenSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* Emergency Sanctuary Modal (SOS) */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        onOpenRelapseGuide={() => {
          setIsSosOpen(false);
          handleOpenArticle('relapse');
        }}
      />

      {/* 3-Minute Self Assessment Quiz Modal */}
      <SelfAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onReadArticle={(articleId) => {
          setIsAssessmentOpen(false);
          handleOpenArticle(articleId);
        }}
        onOpenSos={() => {
          setIsAssessmentOpen(false);
          setIsSosOpen(true);
        }}
      />

    </div>
  );
}
