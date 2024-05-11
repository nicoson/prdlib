function arrangeDocument(ele, file) {
    let section_dom = '';
    let nav_dom = `<div class="panel-nav">
                        <nav></nav>
                    </div>`.replace(/    /g, '');

    let cover_dom = `<div class="cover">`;
    file.cover.map(item => {
        cover_dom += `<p class="${item.class}">${item.text}</p>`;
    });
    cover_dom += `</div>`;

    let body_dom = `<div class="body">`;
    let level = [0];
    let directory = [];
    file.body.map(item => {
        body_dom += subarrange(item, level, directory);
    });
    body_dom += `</div>`;

    section_dom = `
        ${nav_dom}
        <div class="panel-content">
            <div>
                ${cover_dom}
                <div class="catalog"></div>
                ${body_dom}
                <div class="appendix"></div>
            </div>
        </div>
    `.replace(/    /g, '');
    
    ele.innerHTML = section_dom;

    // setting navigation
    let catalog = '<h3>目录</h3><ol>';
    directory.map(item => {
        catalog += `<li><a href="#${item.anchor}" class="dir-level-${item.name.split('.').length}">${item.name}</a></li>`;
    });
    catalog += '</ol>';
    document.querySelector('nav').innerHTML = catalog;
    console.log(file);
}

function subarrange(item, level, directory) {
    let tmp = '';

    switch(item.type) {
        case 'chapter':
            level[level.length-1] += 1;
            item.level = level.join('-');
            directory.push({
                name: `${level.join('.')} ${item.text}`,
                anchor: `chapter-${level.join('-')}`
            });
            tmp = `<ul class="chapter-level-${level.length}">
                            <li>
                                <p id="chapter-${level.join('-')}" class="chapter-title">${level.join('.')} ${item.text}</p>`.replace(/    /g, '');
            
            level.push(0);
            item.content.map(subitem => {
                tmp += subarrange(subitem, level, directory);
            });
            tmp += `</li></ul>`;
            level.splice(-1);
            return tmp;
        case 'list':
            tmp = `<ol>`;
            item.content.map((subitem, ind) => {
                tmp += `<li>${++ind>9?("["+ind):('&nbsp;&nbsp['+ind)}] ${subitem}</li>`;
            });
            return tmp + `</ol>`;
        case 'img-container':
            return `<div class="img-container">
                        <img src="${item.img}" class="${item.class}" alt="" onclick="toggleImage(event)">
                        <p class="img-illustrate">${item.text}</p>
                    </div>`.replace(/    /g, '');
        default:
            return `<p class="${item.class}">${item.text}</p>`;
    }
}

function toggleImage(event) {
    console.log(event);
    if(document.querySelector('.modal-loading').classList.contains('component-hidden')) {
        document.querySelector('.modal-loading img').src = event.target.src;
        document.querySelector('.modal-loading').classList.remove('component-hidden');
    } else {
        document.querySelector('.modal-loading').classList.add('component-hidden');
    }
}