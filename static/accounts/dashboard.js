// // ── QUESTION BANK ──────────────────────────────────────────────
// // const QUESTIONS = {
// //   python: [
// //     { q:"What is the output of: print(type([]))?", opts:["<class 'list'>","<class 'array'>","<class 'tuple'>","<class 'dict'>"], ans:0, exp:"[] creates a list literal, so type([]) returns <class 'list'>." },
// //     { q:"Which keyword is used to define a function in Python?", opts:["func","define","def","function"], ans:2, exp:"'def' is the keyword for defining functions in Python." },
// //     { q:"What does len('hello') return?", opts:["4","5","6","Error"], ans:1, exp:"'hello' has 5 characters, so len() returns 5." },
// //     { q:"Which of the following is an immutable data type in Python?", opts:["list","dict","set","tuple"], ans:3, exp:"Tuples are immutable — they cannot be changed after creation." },
// //     { q:"What is the correct way to create a dictionary in Python?", opts:["{key: value}","[key: value]","(key: value)","<key: value>"], ans:0, exp:"Dictionaries use curly braces: {key: value}." },
// //     { q:"What does the 'self' keyword represent in a Python class?", opts:["The class itself","A static method","The current instance","A global variable"], ans:2, exp:"'self' refers to the current object instance." },
// //     { q:"Which method adds an element to the end of a list?", opts:["add()","insert()","append()","extend()"], ans:2, exp:"list.append(item) adds an element to the end." },
// //     { q:"What is the output of: 10 // 3?", opts:["3.33","3","4","Error"], ans:1, exp:"// is floor division. 10 // 3 = 3." },
// //     { q:"Which of these is NOT a Python data type?", opts:["int","float","char","bool"], ans:2, exp:"Python has no 'char' type. Single characters are strings." },
// //     { q:"What does 'pass' do in Python?", opts:["Exits a loop","A null placeholder — does nothing","Raises an error","Skips to next iteration"], ans:1, exp:"'pass' is a no-op placeholder for empty code blocks." },
// //   ],
// //   java: [
// //     { q:"Which keyword is used to inherit a class in Java?", opts:["implements","inherits","extends","super"], ans:2, exp:"'extends' is used for class inheritance in Java." },
// //     { q:"What is the default value of an int variable in Java?", opts:["null","undefined","0","1"], ans:2, exp:"The default value of an int instance variable in Java is 0." },
// //     { q:"Which of these is NOT a primitive data type in Java?", opts:["int","boolean","String","char"], ans:2, exp:"String is a class, not a primitive type in Java." },
// //     { q:"What is the entry point of a Java program?", opts:["start()","main()","run()","init()"], ans:1, exp:"Execution begins at public static void main(String[] args)." },
// //     { q:"Which keyword prevents a method from being overridden?", opts:["static","final","private","abstract"], ans:1, exp:"'final' prevents a method from being overridden in subclasses." },
// //     { q:"What does JVM stand for?", opts:["Java Virtual Memory","Java Variable Manager","Java Virtual Machine","Java Version Manager"], ans:2, exp:"JVM = Java Virtual Machine, which runs Java bytecode." },
// //     { q:"Which collection allows duplicate elements?", opts:["HashSet","TreeSet","ArrayList","HashMap"], ans:2, exp:"ArrayList is a List that allows duplicates." },
// //     { q:"What is the size of a 'long' in Java?", opts:["32 bits","16 bits","64 bits","128 bits"], ans:2, exp:"A 'long' is a 64-bit signed integer in Java." },
// //     { q:"Which exception is thrown when dividing by zero in Java?", opts:["NullPointerException","ArithmeticException","IllegalArgumentException","StackOverflowError"], ans:1, exp:"Integer division by zero throws ArithmeticException." },
// //     { q:"What does 'this' keyword refer to in Java?", opts:["The parent class","The current object instance","A static context","The class itself"], ans:1, exp:"'this' refers to the current object instance." },
// //   ],
// //   c: [
// //     { q:"Which header file is required for printf() in C?", opts:["stdlib.h","math.h","stdio.h","string.h"], ans:2, exp:"printf() is declared in <stdio.h>." },
// //     { q:"What does the '&' operator return in C?", opts:["Value at address","Bitwise AND only","Address of variable","Size of variable"], ans:2, exp:"'&' is the address-of operator, returning a variable's memory address." },
// //     { q:"Which loop is guaranteed to execute at least once?", opts:["for","while","do-while","foreach"], ans:2, exp:"A do-while loop checks the condition after executing its body." },
// //     { q:"What is the correct syntax to declare a pointer in C?", opts:["int &p","int *p","int #p","pointer int p"], ans:1, exp:"int *p declares p as a pointer to int." },
// //     { q:"What is the size of 'char' in C?", opts:["2 bytes","4 bytes","1 byte","8 bytes"], ans:2, exp:"char is always 1 byte (8 bits) in C." },
// //     { q:"Which function is used to allocate memory dynamically in C?", opts:["alloc()","malloc()","memalloc()","dynamic()"], ans:1, exp:"malloc() allocates a block of memory on the heap." },
// //     { q:"What does 'NULL' represent in C?", opts:["0 integer","Empty string","A null pointer","Undefined behavior"], ans:2, exp:"NULL is a macro representing a null pointer." },
// //     { q:"Which operator accesses a struct member via pointer?", opts:[".","->"," ::","*"], ans:1, exp:"-> dereferences a pointer and accesses a struct member." },
// //     { q:"What is the output of: printf(\"%d\", 5 > 3);?", opts:["true","1","5","Error"], ans:1, exp:"In C, boolean expressions evaluate to 1 (true) or 0 (false)." },
// //     { q:"Which keyword exits a loop immediately in C?", opts:["exit","return","break","stop"], ans:2, exp:"'break' immediately exits the innermost loop or switch." },
// //   ],
// //   cpp: [
// //     { q:"Which operator allocates memory on the heap in C++?", opts:["malloc()","alloc()","new","create"], ans:2, exp:"The 'new' operator allocates heap memory and returns a pointer." },
// //     { q:"What is the output of: cout << 10 % 3;?", opts:["3","1","2","0"], ans:1, exp:"10 % 3 = 1 (remainder of division)." },
// //     { q:"Which concept allows multiple functions with the same name?", opts:["Overriding","Overloading","Inheritance","Encapsulation"], ans:1, exp:"Function overloading allows same name with different parameters." },
// //     { q:"How is an abstract class created in C++?", opts:["Using 'abstract' keyword","Using an interface","Having a pure virtual function","Using 'sealed' keyword"], ans:2, exp:"A class with at least one pure virtual function (= 0) is abstract." },
// //     { q:"Which STL container stores unique sorted elements?", opts:["vector","list","set","deque"], ans:2, exp:"std::set stores unique elements in sorted order." },
// //     { q:"What is 'cin' in C++?", opts:["Standard output","Standard input","File input","String stream"], ans:1, exp:"cin is the standard input stream object." },
// //     { q:"What is a destructor in C++?", opts:["Creates objects","Called when an object is destroyed","A type of constructor","A static method"], ans:1, exp:"~ClassName() is called when an object goes out of scope or is deleted." },
// //     { q:"Which keyword enables compile-time polymorphism?", opts:["virtual","override","template","inline"], ans:2, exp:"Templates provide compile-time (static) polymorphism." },
// //     { q:"What does RAII stand for in C++?", opts:["A loop pattern","Resource Acquisition Is Initialization","Runtime Allocation Indicator","Random Access Iterator"], ans:1, exp:"RAII ties resource management to object lifetime." },
// //     { q:"Which access specifier restricts access to within the class only?", opts:["public","protected","private","internal"], ans:2, exp:"'private' members are only accessible within their own class." },
// //   ],
// //   javascript: [
// //     { q:"Which keyword declares a block-scoped variable in JavaScript?", opts:["var","let","const","Both let and const"], ans:3, exp:"Both 'let' and 'const' are block-scoped. 'var' is function-scoped." },
// //     { q:"What does '===' check in JavaScript?", opts:["Only value","Only type","Both value and type","Neither"], ans:2, exp:"'===' is strict equality — checks both value and type." },
// //     { q:"What is the output of: typeof null?", opts:["null","undefined","object","string"], ans:2, exp:"typeof null returns 'object' — a known JavaScript quirk." },
// //     { q:"Which method converts a JSON string to a JavaScript object?", opts:["JSON.stringify()","JSON.parse()","JSON.convert()","JSON.decode()"], ans:1, exp:"JSON.parse() parses a JSON string into a JS object." },
// //     { q:"What does async/await simplify in JavaScript?", opts:["Loops","DOM manipulation","Working with Promises","Error handling"], ans:2, exp:"async/await is syntactic sugar over Promises." },
// //     { q:"Which array method returns only elements that pass a test?", opts:["map()","reduce()","filter()","find()"], ans:2, exp:"Array.filter() returns a new array with matching elements." },
// //     { q:"What is a closure in JavaScript?", opts:["A way to close the browser","A function retaining access to its outer scope","A CSS property","A type of loop"], ans:1, exp:"A closure is a function that remembers its outer lexical scope." },
// //     { q:"Which method adds elements to the END of an array?", opts:["unshift()","push()","concat()","splice()"], ans:1, exp:"Array.push() appends elements to the end." },
// //     { q:"What does 'DOM' stand for?", opts:["Data Object Model","Document Object Model","Dynamic Object Manager","Document Order Map"], ans:1, exp:"DOM = Document Object Model — the tree of HTML elements." },
// //     { q:"What is the purpose of 'use strict'?", opts:["Enable ES6 features","Enforce stricter error handling","Speed up execution","Enable async code"], ans:1, exp:"'use strict' catches common mistakes and prevents unsafe actions." },
// //   ]
// // };

// // STATE
// let curSubject = null, curQs = [], curIdx = 0, score = 0, answered = false;
// let openDD = null;

// // NAV
// document.addEventListener('click', e => {
//   if (openDD && !openDD.contains(e.target)) { openDD.classList.remove('open'); openDD = null; }
// });
// function toggleDD(id) {
//   const el = document.getElementById(id);
//   if (openDD && openDD !== el) openDD.classList.remove('open');
//   el.classList.toggle('open');
//   openDD = el.classList.contains('open') ? el : null;
// }

// // QUIZ
// // function shuffle(a) { return [...a].sort(() => Math.random() - .5); }

// // function startQuiz(sub) {
// //   curSubject = sub;
// //   curQs = shuffle(QUESTIONS[sub]).slice(0, 5);
// //   curIdx = 0; score = 0; answered = false;

// //   document.getElementById('dashView').style.display = 'none';
// //   document.getElementById('quizView').style.display = 'block';
// //   document.getElementById('scoreCard').classList.remove('visible');
// //   document.getElementById('qCard').style.display = 'block';

// //   const labels = { python:'Python', java:'Java', c:'C', cpp:'C++', javascript:'JavaScript' };
// //   document.getElementById('qSubjectPill').textContent = labels[sub];

// //   renderQ();
// //   window.scrollTo({ top: 0, behavior: 'smooth' });
// // }

// function renderQ() {
//   answered = false;
//   const q = curQs[curIdx];
//   const total = curQs.length;

//   document.getElementById('qNum').textContent = 'Question ' + (curIdx + 1);
//   document.getElementById('qText').textContent = q.q;
//   document.getElementById('qMeta').textContent = 'Question ' + (curIdx + 1) + ' of ' + total;
//   document.getElementById('progBar').style.width = ((curIdx + 1) / total * 100) + '%';
//   document.getElementById('scoreTrack').textContent = 'Score: ' + score + ' / ' + curIdx;
//   document.getElementById('nextBtn').style.display = 'none';

//   const fb = document.getElementById('feedbackBox');
//   fb.className = 'feedback'; fb.textContent = '';

//   const list = document.getElementById('optsList');
//   list.innerHTML = '';
//   ['A','B','C','D'].forEach((lbl, i) => {
//     const btn = document.createElement('button');
//     btn.className = 'opt-btn';
//     btn.innerHTML = `<span class="opt-lbl">${lbl}</span>${q.opts[i]}`;
//     btn.onclick = () => selectAns(i, btn);
//     list.appendChild(btn);
//   });
// }

// function selectAns(idx, btn) {
//   if (answered) return;
//   answered = true;
//   const q = curQs[curIdx];
//   document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);

//   const fb = document.getElementById('feedbackBox');
//   if (idx === q.ans) {
//     score++;
//     btn.classList.add('correct');
//     fb.textContent = '✓ Correct! ' + q.exp;
//     fb.className = 'feedback ok show';
//   } else {
//     btn.classList.add('wrong');
//     document.querySelectorAll('.opt-btn')[q.ans].classList.add('correct');
//     fb.textContent = '✗ Incorrect. ' + q.exp;
//     fb.className = 'feedback bad show';
//   }

//   document.getElementById('scoreTrack').textContent = 'Score: ' + score + ' / ' + (curIdx + 1);
//   const nb = document.getElementById('nextBtn');
//   nb.style.display = 'inline-flex';
//   nb.textContent = curIdx + 1 < curQs.length ? 'Next Question →' : 'See Results';
// }

// function nextQ() {
//   curIdx++;
//   if (curIdx < curQs.length) { renderQ(); }
//   else { showScore(); }
// }

// function showScore() {
//   document.getElementById('qCard').style.display = 'none';
//   const pct = Math.round(score / curQs.length * 100);
//   document.getElementById('scNum').textContent = score;
//   document.getElementById('scDen').textContent = '/' + curQs.length;
//   document.getElementById('progBar').style.width = '100%';

//   let title, msg;
//   if (pct === 100) { title = '🏆 Perfect Score!'; msg = 'Outstanding! You got every question right.'; }
//   else if (pct >= 80) { title = '🎉 Great Job!'; msg = 'Excellent work! You have a strong grasp of this subject.'; }
//   else if (pct >= 60) { title = '👍 Good Effort!'; msg = 'Nice attempt! Review the explanations and try again.'; }
//   else if (pct >= 40) { title = '📚 Keep Practicing'; msg = 'You are getting there! Go back to the basics and retry.'; }
//   else { title = '💪 Don\'t Give Up!'; msg = 'This topic needs more practice. Study the material and try again.'; }

//   document.getElementById('scTitle').textContent = title;
//   document.getElementById('scMsg').textContent = 'You scored ' + score + ' out of ' + curQs.length + ' (' + pct + '%). ' + msg;
//   document.getElementById('scoreCard').classList.add('visible');
// }

// function retryQuiz() { startQuiz(curSubject); }

// function goToDashboard() {
//   document.getElementById('quizView').style.display = 'none';
//   document.getElementById('dashView').style.display = 'block';
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// // MODAL
// function openLogout() { if (openDD) { openDD.classList.remove('open'); openDD = null; } document.getElementById('logoutOverlay').classList.add('open'); }
// function closeLogout() { document.getElementById('logoutOverlay').classList.remove('open'); }
