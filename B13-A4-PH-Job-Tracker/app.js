// Sample Data
let jobs = [
    { id: 1, company: "Mobile First Corp", role: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130k - $175k", info: "Build cross-platform mobile applications using React Native.", status: "all" },
    { id: 2, company: "WebFlow Agency", role: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80k - $120k", info: "Create stunning web experiences for high-profile clients.", status: "all" },
    { id: 3, company: "Tech Flow", role: "Frontend Engineer", location: "Remote", type: "Contract", salary: "$90k - $110k", info: "Maintain and scale the main dashboard of the product.", status: "all" },
    { id: 4, company: "Creative Minds", role: "UI/UX Designer", location: "New York", type: "Full-time", salary: "$100k - $140k", info: "Develop user journeys and wireframes for new features.", status: "all" },
    { id: 5, company: "Dev Systems", role: "Junior JS Developer", location: "Remote", type: "Full-time", salary: "$60k - $80k", info: "Work with the core team to implement new JS modules.", status: "all" },
    { id: 6, company: "App Studio", role: "Full Stack Dev", location: "Austin, TX", type: "Full-time", salary: "$120k - $150k", info: "Design and implement end-to-end features for web apps.", status: "all" },
    { id: 7, company: "Cloud Net", role: "SQA Engineer", location: "Remote", type: "Part-time", salary: "$70k - $90k", info: "Ensure the quality and stability of our cloud platform.", status: "all" },
    { id: 8, company: "Soft Serve", role: "Backend Developer", location: "Remote", type: "Full-time", salary: "$110k - $140k", info: "Optimize server-side logic and database queries.", status: "all" }
];

let activeCategory = 'all';

// On start
window.onload = () => {
    displayJobs('all');
    refreshCounter();
};

function displayJobs(category) {
    const listDiv = document.getElementById('jobs-wrapper');
    const emptyMsg = document.getElementById('no-data');
    
    // Filter jobs
    let filtered = category === 'all' ? jobs : jobs.filter(j => j.status === category);
    
    listDiv.innerHTML = "";
    document.getElementById('job-count').innerText = filtered.length;

    if (filtered.length === 0) {
        listDiv.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
    } else {
        listDiv.classList.remove('hidden');
        emptyMsg.classList.add('hidden');

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = "job-card p-6 rounded-xl flex justify-between items-start relative";
            card.innerHTML = `
                <div>
                    <h4 class="text-lg font-bold text-gray-200">${item.company}</h4>
                    <p class="text-gray-400 text-sm mb-2 font-medium">${item.role}</p>
                    <div class="flex gap-3 text-[11px] text-gray-500 mb-4">
                        <span>${item.location}</span> • <span>${item.type}</span> • <span>${item.salary}</span>
                    </div>
                    <p class="text-sm text-gray-500 max-w-2xl mb-5">${item.info}</p>
                    <div class="flex gap-2">
                        <button onclick="setStatus(${item.id}, 'interview')" class="btn btn-xs btn-outline border-gray-600 text-gray-400 hover:bg-blue-600 hover:border-blue-600">Interview</button>
                        <button onclick="setStatus(${item.id}, 'rejected')" class="btn btn-xs btn-outline border-gray-600 text-gray-400 hover:bg-red-600 hover:border-red-600">Rejected</button>
                    </div>
                </div>
                <button onclick="trashJob(${item.id})" class="text-gray-600 hover:text-red-500 border border-gray-700 p-1 px-2 rounded">
                    🗑
                </button>
            `;
            listDiv.appendChild(card);
        });
    }
}

function setStatus(id, newStatus) {
    const target = jobs.find(j => j.id === id);
    if(target) {
        target.status = newStatus;
    }
    refreshCounter();
    displayJobs(activeCategory);
}

function trashJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    refreshCounter();
    displayJobs(activeCategory);
}

function refreshCounter() {
    let intCount = jobs.filter(j => j.status === 'interview').length;
    let rejCount = jobs.filter(j => j.status === 'rejected').length;

    document.getElementById('total-applied').innerText = jobs.length;
    document.getElementById('total-interview').innerText = intCount;
    document.getElementById('total-rejected').innerText = rejCount;
}

function changeTab(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('tab-active-custom');
        b.classList.add('bg-gray-800');
    });
    btn.classList.add('tab-active-custom');
    btn.classList.remove('bg-gray-800');
    displayJobs(cat);
}