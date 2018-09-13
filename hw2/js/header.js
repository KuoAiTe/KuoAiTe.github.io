
var d = `
<header class="blog-header py-3">
    <div class="row flex-nowrap justify-content-between align-items-center">
    <div class="col-4 pt-1"></div>
    <div class="col-4 text-center">
        <a class="blog-header-logo text-light" href="index.html">Matcher</a>
    </div>
    <div class="col-3 d-flex justify-content-end align-items-center">
        <a class="text-muted" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
        </a>
        <a class="btn btn-sm btn-outline-secondary" href="login.html" style="width:85px;">Log in</a>
    </div>
    <div class="col-1"></div>
    </div>
</header>
<div class="nav-scroller row">
    <div class="py-1 mb-2 col-md-6" style="margin:auto;">
		<nav class="nav d-flex justify-content-between">
			<a class="p-2 text-light" href="scholarships.html">Scholarships</a>
			<a class="p-2 text-light" href="college.html">College</a>
			<a class="p-2 text-light" href="404.html">Finacial Aid</a>
			<a class="p-2 text-light" href="404.html">Resources</a>
		</nav>
    </div>
</div>`;
var footer = `
<div class="container py-5 text-center">
    <ul class="list-inline mb-5">
        <li class="list-inline-item">
            <a class="social-link rounded-circle text-white mr-3" href="#">
                <i class="fab fa-facebook-f text-white" style="font-size:40px;"></i>
            </a>
        </li>
        <li class="list-inline-item">
            <a class="social-link rounded-circle text-white mr-3" href="#">
                <i class="fab fa-twitter text-white" style="font-size:40px;"></i>
            </a>
        </li>
        <li class="list-inline-item">
            <a class="social-link rounded-circle" href="#">
                <i class="fab fa-github text-white" style="font-size:40px;"></i>
            </a>
        </li>
    </ul>
    <p class="text-muted mb-0">COMP 5620 - User Interface | Assignment 2 | Ai-Te Kuo, Tian Xia</p>
</div>`;
$("body").prepend(d);
$('footer').html(footer);
