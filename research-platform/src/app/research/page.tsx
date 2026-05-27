import { Suspense } from 'react';
import ResearchContent from './ResearchContent';

export default function ResearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050B18' }}>
        <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: '#00D4FF' }} />
      </div>
    }>
      <ResearchContent />
    </Suspense>
  );
}
