const td = document.querySelectorAll("td");
const tr = document.querySelectorAll("tr");
const yearAndMonth = document.querySelector(".yearAndMonth");
const dayOfweekView = document.querySelector(".dayOfweek");
const dateView = document.querySelector(".date");
const btnLeft = document.querySelectorAll("button")[0];
const btnRight = document.querySelectorAll("button")[1];

const days= ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

const date = new Date()
let thisMonth = date.getMonth(); //달은 0부터 시작함
let thisYear = date.getFullYear();
let firstDay
let lastDay
const today = date.getDate();

dayOfweekView.textContent = days[date.getDay()];
dateView.textContent = date.getDate();


//first, lastday calculator and Year&Month wirter
function dateCalculator() {
	firstDay = new Date(thisYear, thisMonth, 1).getDay(); //1일 무슨 요일( 0 = 일요일)
	lastDay = new Date(thisYear, thisMonth + 1, 0).getDate(); //마지막 날이 몇일 까지 있는지
	yearAndMonth.textContent = `${month[thisMonth]} ${thisYear}`;
};

//버튼 클릭 후 writeDay 함수 실행 전 달력 표시 되어있는 것들 지워주는 함수
function emptyDay() {
	for(let i=0; i<42; i++){
		td[7+i].textContent = "";
		td[7+i].style.color = "";
	};
};

function writeDay() {
	for(let i=0; i<lastDay; i++){
		td[firstDay+7+i].textContent = i+1;
	};
	if(thisYear === date.getFullYear() && thisMonth === date.getMonth()){
		td[today+8].style.color = "red";
	}
	dayOfweekView.textContent = days[new Date(thisYear, thisMonth, today).getDay()];
	dateView.textContent = date.getDate();
};

dateCalculator();
writeDay();

// date 클릭 이벤트 함수
for(let i=1; i<tr.length; i++){
	for(let j=0; j<7; j++) {
		tr[i].children[j].addEventListener("click", function() {
			if(tr[i].children[j].textContent === ""){
				return;
			}else {
				dateView.textContent = tr[i].children[j].textContent;
				dayOfweekView.textContent = days[j];
			}
		})
	}
}

btnLeft.addEventListener("click", function(){
	if(thisMonth === 0){
		thisMonth = 11;
		thisYear -= 1
		dateCalculator();
	}else if(thisMonth !== 0){
		thisMonth -= 1;
		dateCalculator();
		emptyDay();
		writeDay();
	}
})

btnRight.addEventListener("click", function(){
	if(thisMonth === 11){
		thisMonth = 0;
		thisYear += 1
		dateCalculator();
		}else if(thisMonth !== 11){
		thisMonth += 1;
		dateCalculator();
		emptyDay();
		writeDay();
	}
})