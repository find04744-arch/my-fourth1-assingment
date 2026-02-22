let myJobs = [
    { id: 1, name: "Mobile First Corp", role: "React Native Developer", loc: "Remote", type: "Full-time", pay: "$130k - $175k", info: "Build cross-platform mobile applications using React Native.", status: "all" },
    { id: 2, name: "WebFlow Agency", role: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", pay: "$80k - $120k", info: "Create stunning web experiences for high-profile clients.", status: "all" },
    { id: 3, name: "Tech Solutions", role: "Frontend Dev", loc: "Remote", type: "Contract", pay: "$50k - $70k", info: "Work on amazing UI components for global brands.", status: "all" },
    { id: 4, name: "Cloud Tech", role: "Backend Developer", loc: "New York", type: "Full-time", pay: "$100k - $120k", info: "Handling server side logic and API structures.", status: "all" },
    { id: 5, name: "Digital Plus", role: "UX Designer", loc: "London", type: "Intern", pay: "$30k - $40k", info: "Help the design team build better prototypes.", status: "all" },
    { id: 6, name: "App Masters", role: "Junior Dev", loc: "Remote", type: "Full-time", pay: "$60k - $80k", info: "Support the senior team in fixing bugs and UI issues.", status: "all" },
    { id: 7, name: "Innovate IT", role: "SQA Engineer", loc: "Dhaka", type: "Full-time", pay: "40k - 50k", info: "Testing the stability of our main software products.", status: "all" },
    { id: 8, name: "Soft Systems", role: "Product Manager", loc: "Remote", type: "Full-time", pay: "$90k - $110k", info: "Manage team tasks and product delivery dates.", status: "all" }
];

let currentFilter = 'all';

window.onload = function() {
    showData('all');
    refreshStats();
};

function showData(filterType) {
    const wrapper = document.getElementById('job-list-container');
    const emptyMsg = document.getElementById('no-jobs-msg');
    
    let filteredList = [];
    if(filterType === 'all') {
        filteredList = myJobs;
    } else {
        for(let i=0; i < myJobs.length; i++) {
            if(myJobs[i].status === filterType) {
                filteredList.push(myJobs[i]);
            }
        }
    }

    wrapper.innerHTML = "";
    document.getElementById('job-total-ui').innerText = filteredList.length;

    if(filteredList.length === 0) {
        wrapper.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
    } else {
        wrapper.classList.remove('hidden');
        emptyMsg.classList.add('hidden');
        filteredList.forEach(function(item) {
            let div = document.createElement('div');
            div.className = "my-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative gap-4";
            div.innerHTML = `
                <div class="w-full">
                    <h4 class="text-lg font-bold text-gray-100">${item.name}</h4>
                    <p class="text-blue-400 text-sm mb-1">${item.role}</p>
                    <div class="flex flex-wrap gap-2 text-[11px] text-gray-500 mb-4 uppercase font-semibold">
                        <span>${item.loc}</span> • <span>${item.type}</span> • <span>${item.pay}</span>
                    </div>
                    <p class="text-sm text-gray-500 mb-4">${item.info}</p>
                    <div class="flex gap-2">
                        <button onclick="updateJobStatus(${item.id}, 'interview')" class="btn btn-xs btn-outline border-slate-600 text-gray-300 hover:bg-blue-600">Interview</button>
                        <button onclick="updateJobStatus(${item.id}, 'rejected')" class="btn btn-xs btn-outline border-slate-600 text-gray-300 hover:bg-red-600">Rejected</button>
                    </div>
                </div>
                <button onclick="deleteThisJob(${item.id})" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
                    Delete
                </button>
            `;
            wrapper.appendChild(div);
        });
    }
}

function updateJobStatus(id, newStatus) {
    for(let i=0; i<myJobs.length; i++) {
        if(myJobs[i].id === id) {
            myJobs[i].status = newStatus;
            break;
        }
    }
    refreshStats();
    showData(currentFilter);
}

function deleteThisJob(id) {
    let confirmDel = confirm("Are you sure you want to delete this?");
    if(confirmDel) {
        myJobs = myJobs.filter(job => job.id !== id);
        refreshStats();
        showData(currentFilter);
    }
}

function refreshStats() {
    let total = myJobs.length;
    let interviewCount = 0;
    let rejectedCount = 0;

    for(let i=0; i < myJobs.length; i++) {
        if(myJobs[i].status === 'interview') interviewCount++;
        if(myJobs[i].status === 'rejected') rejectedCount++;
    }

    document.getElementById('applied-count').innerText = total;
    document.getElementById('interview-count').innerText = interviewCount;
    document.getElementById('rejected-count').innerText = rejectedCount;
}

function filterAction(type, btn) {
    currentFilter = type;
    
    let buttons = document.getElementsByClassName('btn-filter');
    for(let b of buttons) {
        b.classList.remove('active-tab');
        b.classList.add('bg-slate-800');
    }
    btn.classList.add('active-tab');
    btn.classList.remove('bg-slate-800');
    showData(type);
}