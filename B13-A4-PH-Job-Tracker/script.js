let jobs = [
    { id: 1, company: "Mobile First Corp", role: "React Native Developer", loc: "Remote", type: "Full-time", salary: "$130k-$175k", status: "all", desc: "Build cross-platform mobile apps using React Native. Work on products used by millions." },
    { id: 2, company: "Webflow Agency", role: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", salary: "$90k-$120k", status: "all", desc: "Create stunning web experiences for high-profile clients. Portfolio required." },
    { id: 3, company: "DataViz Solutions", role: "Data Specialist", loc: "Boston, MA", type: "Full-time", salary: "$125k-$155k", status: "all", desc: "Transform complex data into compelling visualizations. D3.js experience is a plus." },
    { id: 4, company: "CloudFirst Inc", role: "Backend Developer", loc: "Seattle, WA", type: "Full-time", salary: "$140k-$190k", status: "all", desc: "Design and maintain scalable backend systems using Python and AWS." },
    { id: 5, company: "Innovation Labs", role: "UI/UX Engineer", loc: "Austin, TX", type: "Full-time", salary: "$110k-$150k", status: "all", desc: "Create beautiful and functional user interfaces for our suite of products." },
    { id: 6, company: "MegaCorp Solutions", role: "JavaScript Developer", loc: "New York, NY", type: "Full-time", salary: "$130k-$170k", status: "all", desc: "Build enterprise applications with JavaScript and modern frameworks." },
    { id: 7, company: "StartupXYZ", role: "Full Stack Engineer", loc: "Remote", type: "Full-time", salary: "$120k-$160k", status: "all", desc: "Join our fast-growing startup and work on our core platform using Node.js." },
    { id: 8, company: "TechCorp Industries", role: "Frontend Developer", loc: "San Francisco", type: "Full-time", salary: "$130k-$175k", status: "all", desc: "Develop high-quality web applications for global clients." }
];

let currentTab = 'all';

function renderJobs() {
    const container = document.getElementById('job-container');
    const emptyState = document.getElementById('empty-state');
    const filtered = jobs.filter(job => currentTab === 'all' ? true : job.status === currentTab);
    
    document.getElementById('job-status-count').innerText = filtered.length;
    updateDashboard();

    if (filtered.length === 0) {
        container.innerHTML = "";
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = filtered.map(job => `
        <div class="bg-white p-5 rounded-lg border shadow-sm hover:shadow-md transition-all relative">
            <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <h4 class="font-bold text-slate-700">${job.company}</h4>
            <h5 class="text-sm font-semibold text-blue-600 mb-2">${job.role}</h5>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3 font-medium">
                <span>${job.loc}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
            </div>
            <div class="mb-2">
                <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Not Applied</span>
            </div>
            <p class="text-sm text-gray-600 mb-4 leading-relaxed">${job.desc}</p>
            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-sm btn-outline btn-success normal-case ${job.status === 'interview' ? 'bg-green-600 text-white' : ''}">Interview</button>
                <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-sm btn-outline btn-error normal-case ${job.status === 'rejected' ? 'bg-red-600 text-white' : ''}">Rejected</button>
            </div>
        </div>
    `).join('');
}

function updateStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobs[jobIndex].status === newStatus) {
        jobs[jobIndex].status = 'all'; 
    } else {
        jobs[jobIndex].status = newStatus;
    }
    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

function filterJobs(tab) {
    currentTab = tab;
    ['all', 'interview', 'rejected'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (t === tab) {
            el.classList.add('tab-active', 'bg-blue-600', 'text-white');
            el.classList.remove('bg-white');
        } else {
            el.classList.remove('tab-active', 'bg-blue-600', 'text-white');
            el.classList.add('bg-white');
        }
    });
    
    renderJobs();
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}
renderJobs();