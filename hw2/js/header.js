
var d = `
<header class="blog-header py-3">
    <div class="row flex-nowrap justify-content-between align-items-center">
    <div class="col-4 pt-1"></div>
    <div class="col-4 text-center">
        <a class="blog-header-logo text-light" href="index.html">HW</a>
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
        <a class="p-2 text-light" href="college.html">Schools</a>
        <a class="p-2 text-light" href="scholarships.html">Scholarships</a>
        <a class="p-2 text-light" href="404.html">Finacial Aid</a>
        <a class="p-2 text-light" href="404.html">Resources</a>
      </nav>
    </div>
</div>`;

$("body").prepend(d);
