import React from 'react';

const Recruitment = () => {
  const jobs = [
    { title: 'Senior Frontend Developer', company: 'TechCorp Inc', match: '92%', type: 'Remote', salary: '$120k - $150k' },
    { title: 'Full Stack Engineer', company: 'TechCorp Inc', match: '85%', type: 'Remote', salary: '$120k - $150k' },
    { title: 'React Developer', company: 'TechCorp Inc', match: '92%', type: 'Remote', salary: '$120k - $150k' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-slate-800">Recruitment</h1>
      <p className="text-slate-500 mb-8 text-sm">Streamlining Your Hiring Journey from Application to On-boarding.</p>

      {/* Recruitment Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {['Total Openings', 'Total Applicants', 'Interviews Today', 'Hired this Month'].map((text, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
             <span className="text-xs font-semibold text-slate-400 block mb-2 uppercase">{text}</span>
             <span className="text-2xl font-bold text-slate-800">24</span>
             <span className="text-[10px] text-slate-400 block">+3 this week</span>
          </div>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg text-slate-800">{job.title}</h3>
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{job.match} match</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{job.company} • San Francisco, CA • {job.type}</p>
              <div className="flex gap-2">
                {['React', 'TypeScript', 'Node.js'].map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-[11px] px-3 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-right">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Publish</button>
                <p className="text-xs text-slate-400 mt-2">1 day ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;