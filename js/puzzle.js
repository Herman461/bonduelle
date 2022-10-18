
initGame()

let width = 0

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.querySelector('.quiz__pieces').addEventListener('scroll', function(e) {
    const scrollWidth = e.target.scrollWidth - window.innerWidth
    const percent = (e.target.scrollLeft / scrollWidth) * 100
    document.querySelector('.quiz__line span').style.left = percent + '%'
})

document.querySelector('.quiz__line span').addEventListener('mouseenter', function() {
    console.log(e.pageY)
})

sessionStorage.setItem('stage', 0)


const pieces = []

const data = [
    {
        id: 1,
        width: 202,
        height: 171,
        imageSrc: 'images/puzzles/1.svg',
        href: null,
    },
    {
        id: 2,
        width: 182,
        height: 206,
        imageSrc: 'images/puzzles/2.svg',
        href: null,
    },
    {
        id: 3,
        width: 202,
        height: 171,
        imageSrc: 'images/puzzles/3.svg',
        href: null,
    },
    {
        id: 4,
        width: 170,
        height: 206,
        imageSrc: 'images/puzzles/4.svg',
        href: null,
    },
    {
        id: 5,
        width: 247,
        height: 170,
        imageSrc: 'images/puzzles/5.svg',
        href: null,
    },
    {
        id: 6,
        width: 176,
        height: 206,
        imageSrc: 'images/puzzles/6.svg',
        href: null,
    },
]

const imageObj = new Image()

let questions = []

const puzzleType = sessionStorage.getItem('puzzleType')

const prevButton = document.querySelector('.quiz__prev-button')

prevButton.addEventListener('click', function(e) {
    e.preventDefault()

    if (document.querySelector('.quiz__top.active')
        && window.matchMedia('(min-width: 768.98px)').matches
    ) {
        resetQuestion()
        return
    }
    if (document.querySelector('.quiz__variants.active')
        && window.matchMedia('(max-width: 768.98px)').matches
    ) {
        resetQuestion()
        return
    }

    window.location.href = '/'
})

function resetQuestion() {
    document.querySelector('.header').classList.remove('fixed')

    document.body.classList.remove('lock')
    document.querySelector('.quiz__title').innerHTML = `выбирай пазл,<br /> отвечай на вопросы<br /> и собери картинку`

    if (window.matchMedia('(max-width: 991.98px)').matches) {
        document.querySelector('.quiz__top').appendChild(document.querySelector('.quiz__title'))
    }

    document.querySelector('.quiz__variants.active').innerHTML = ''
    document.querySelector('.quiz__variants.active').classList.remove('active')


    const arrows = document.querySelectorAll('.quiz__arrow')
    for (let index = 0; index < arrows.length; index++) {
        const arrow = arrows[index]
        arrow.hidden = false
    }
    if (window.matchMedia('(min-width: 991.98px)').matches) {
        document.querySelector('.quiz__top').classList.remove('active')
        const boardPos = document.querySelector('.quiz__board').getBoundingClientRect()
        window.scrollTo(0, boardPos.top - 10)
    }
}

function dragElement(el) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    el.onpointerdown = pointerDrag;

    function pointerDrag(e) {

        if (e.target.closest('.quiz__piece') && !e.target.closest('.quiz__piece').classList.contains('active')) return

        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {

        if (e.target.closest('.quiz__piece') && !e.target.closest('.quiz__piece').classList.contains('active')) return

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if (parseInt(window.getComputedStyle(el).left) > window.innerWidth) {
            el.style.left = (window.innerWidth - el.offsetWidth) + 'px'
        }
        if (window.matchMedia('(max-width: 991.98px)').matches) {
            el.style.transform = 'scale(1)'
            setPiecePosition()
            document.querySelector('.quiz__pieces').style.overflowX = 'visible'
        }

        if (el.closest('.quiz__pieces') && window.matchMedia('(max-width: 991.98px)').matches) {
            document.querySelector('.quiz__puzzles').appendChild(el)
        }

        if (document.querySelector('.quiz__win') && !e.target.closest('.quiz__win')) {
            document.querySelector('.quiz__board').style.position = 'static'
            document.querySelector('.quiz__win').remove()

        }



        el.style.top = el.offsetTop - pos2 + "px";
        el.style.left = el.offsetLeft - pos1 + "px";

    }

    function stopElementDrag(e) {
        document.onpointerup = null;
        document.onpointermove = null;
        const squares = document.querySelectorAll('.quiz__square')

        if (window.matchMedia('(max-width: 991.98px)').matches) {
            document.querySelector('.quiz__pieces').style.overflowX = 'auto'
        }
        for (let index = 0; index < squares.length; index++) {

            const square = squares[index]

            const squarePos = square.getBoundingClientRect()
            const squareX = squarePos.x
            const squareY = squarePos.y

            const puzzlePos = e.target.getBoundingClientRect()

            const puzzleX = puzzlePos.x
            const puzzleY = puzzlePos.y
            const puzzleWidth = puzzlePos.width
            const puzzleHeight = puzzlePos.height

            let radius = 150

            if (window.matchMedia('(max-width: 991.98px)').matches) {
                radius = 100
            }
            const x = puzzleX - squareX > (radius * -1) && puzzleX - squareX + radius < puzzleWidth
            const y = puzzleY - squareY > (radius * -1) && puzzleY - squareY + radius < puzzleHeight

            if (x && y)  {
                const piece = e.target.closest('.quiz__piece')

                const squareIndex = square.dataset.squareIndex
                const pieceIndex = piece.dataset.pieceIndex

                if (squareIndex !== pieceIndex) {
                    setInitialPosition(el)
                    return
                }


                if (squareIndex !== pieceIndex && window.matchMedia('(max-width: 991.98px)').matches) return
                setFinalPosition(piece, square)

                if (Number(piece.dataset.positionIndex) === 0) {
                    document.querySelector('.quiz__arrow_second').classList.add('show')
                }

                if (Number(piece.dataset.positionIndex) === 2) {
                    document.querySelector('.quiz__arrow_second').classList.add('hide')
                    document.querySelector('.quiz__arrow_first').classList.add('hide')
                }
                const stage = +sessionStorage.getItem('stage')
                sessionStorage.setItem('stage', stage + 1)

                document.querySelector('.quiz__variants').innerHTML = ''
                document.querySelector('.quiz__title').innerHTML = 'выбирай пазл,<br /> отвечай на вопросы<br /> и собери картинку'

                updatePieceIndices()
                setGameOver()
            } else {
                // console.log('?')
                // el.classList.remove('active')
                // setInitialPosition(el)
                // setPiecePosition()
                // el.classList.add('active')
            }
        }


    }
}

function updatePieceIndices() {
    const pieces = document.querySelector('.quiz__pieces').querySelectorAll('.quiz__piece')
    for (let index = 0; index < pieces.length; index++) {
        const piece = pieces[index]
        piece.dataset.positionIndex = String(index)
    }
}

function setGameOver() {
    const fixedPieces = document.querySelectorAll('.quiz__piece.fixed')

    if (fixedPieces.length === 6) {
        document.querySelector('.quiz__main').style.display = 'none'
        document.querySelector('.quiz__game-over').style.display = 'block'
        document.querySelector('.quiz__game-over').classList.add('active')
    }
}


function setPieces() {
    const wrapper = document.querySelector('.quiz__pieces')
    const indices = [0, 1, 2, 3, 4, 5]
    shuffle(indices)

    let positionIndex = 0
    indices.forEach(index => {
        const piece = document.createElement('div');
        piece.className = 'quiz__piece'
        piece.dataset.pieceIndex = String(index)
        piece.dataset.positionIndex = String(positionIndex)
        wrapper.appendChild(piece)

        piece.addEventListener('click', setQuestion)

        dragElement(piece)

        piece.addEventListener( 'touchmove', function(e) {
            e.preventDefault()
        })

        positionIndex++
    })


}
function setSocialIcons() {
    document.querySelector('.game-over__image').appendChild(imageObj)
    document.querySelector('.social-game-over__item_vk').innerHTML = VK.Share.button({
        url: window.location.origin + '/',
        title: 'Сыграй в игру с супер-кукурузиком и супер-горошком и узнай, какие супер-силы они могут тебе дать!',
        image: window.location.origin + '/upload/quiz/repost-image.png',
    },{
        type: 'custom',
        text: `<svg>
                    <use xlink:href="images/icons/icons.svg#vk"></use>
               </svg>`
    });

    OK.CONNECT.insertShareWidget(
        "ok_shareWidget",
        window.location.origin + '/',
        '{"sz":30,"st":"oval","nc":1,"nt":1,"bgclr":"ED8207","txclr":"FFFFFF"}',
        "Сыграй в игру с супер-кукурузиком и супер-горошком и узнай, какие супер-силы они могут тебе дать!",
        "",
        window.location.origin + '/upload/quiz/repost-image.png'
    )
}


async function initGame() {
    document.body.classList.add('puzzle-game')
    setWatchPersonButton()
    setPieces()

    const response = await fetch('https://bonduelle.mws.agency/api/v1/questions/')


    if (response.ok) {
        const json = await response.json();
        const data = json.data

        for (let index = 0; index < data.length; index++) {
            const item = data[index]

            if (!sessionStorage.getItem('puzzleType')) {
                sessionStorage.setItem('puzzleType', 'together')
            }


            if (item.type === sessionStorage.getItem('puzzleType')) {

                imageObj.crossOrigin = 'anonymous'
                imageObj.src = item.imageUrl
                imageObj.onload = setGame

                sessionStorage.setItem('questions', JSON.stringify(item.questions))
                break;
            }
        }

    }

    setSocialIcons()

    document.querySelector('.quiz__preloader').remove()
}

async function setGame() {

    if (window.matchMedia("(max-width: 991.98px)").matches) {
        document.querySelector('.quiz__pieces').classList.add('load')
    }
    let timeout = 0
    let sourceY = 0
    let sourceX = 0
    const updatedImage = resizeImage(imageObj)
    updatedImage.onload = async function() {

        for (let index = 0; index < 6; ++index) {


            const piece = data[index]
            const response = await fetch(piece.imageSrc)
            const str = await response.text()
            const doc = new DOMParser()


            const svgImage = await doc.parseFromString(str, "image/svg+xml")

            const pieceDOM = document.querySelector(`.quiz__piece[data-piece-index="${index}"]`)
            pieceDOM.removeAttribute('style')
            let width = parseFloat(window.getComputedStyle(pieceDOM).width)
            let height = parseFloat(window.getComputedStyle(pieceDOM).height)

            // Устанавливаем начало координат, начиная со второго столбца пазлов
            if (index % 3 !== 0) {
                sourceX += width;
            } else {
                sourceX = 0
            }

            // Устанавливаем начало координат для второй строки пазлов
            if (index > 2) {
                sourceY = height;
            }

            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d');


            canvas.width = width
            canvas.height = height

            context.width = String(width)
            context.height = String(height)



            // Отрисовка кусков пазла на различных расширениях экрана
            if (window.matchMedia("(min-width: 991.98px)").matches) {
                switch (index) {
                    case 0:
                        context.drawImage(updatedImage, sourceX, sourceY, width, height, 0, 0, width, height);
                        break;
                    case 1:
                        context.drawImage(updatedImage, sourceX - 35, sourceY, width, height, 0, 0, width, height);
                        break;
                    case 2:
                        context.drawImage(updatedImage, 274, sourceY, width, height, 0, 0, width, height );
                        break;
                    case 3:
                        context.drawImage(updatedImage, sourceX, sourceY - 90, width, height, 0, 0, width, height);
                        break;
                    case 4:
                        context.drawImage(updatedImage, sourceX - 130, sourceY - 20, width, height, 0, 0, width, height);
                        break;
                    case 5:
                        context.drawImage(updatedImage, 307, sourceY - 89, width, height, 0, 0, width, height);
                        break;
                }
            } else {
                switch (index) {
                    case 0:
                        context.drawImage(updatedImage, sourceX, sourceY, width, height, 0, 0, width, height);
                        break;
                    case 1:
                        context.drawImage(updatedImage, sourceX - 25, sourceY, width, height, 0, 0, width, height);
                        break;
                    case 2:
                        context.drawImage(updatedImage, 185, sourceY, width, height, 0, 0, width, height);
                        break;
                    case 3:
                        context.drawImage(updatedImage, sourceX, sourceY - 62, width, height, 0, 0, width, height);
                        break;
                    case 4:
                        context.drawImage(updatedImage, sourceX - 91, sourceY - 15, width, height, 0, 0, width, height);
                        break;
                    case 5:
                        context.drawImage(updatedImage, 210, sourceY - 66, width, height, 0, 0, width, height);
                        break;
                }
            }
            piece.href = canvas.toDataURL()

            svgImage.querySelector('image').setAttribute('xlink:href', piece.href);

            svgImage.querySelector('image').setAttribute( 'width', piece.width);
            svgImage.querySelector('image').setAttribute( 'height', piece.height);

            svgImage.querySelector('svg').setAttribute('viewBox', '0 0 ' + (piece.width + 2) + ' ' + piece.height)
            svgImage.querySelector('svg').setAttribute('width', width)
            svgImage.querySelector('svg').setAttribute('height', height)

            pieceDOM.innerHTML = svgImage.documentElement.outerHTML

        }

        setPiecePosition()

        if (window.matchMedia("(max-width: 991.98px)").matches) {

            document.querySelector('.quiz__pieces').classList.remove('load')
        }

    }


}

function setPiecePosition() {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
        const pieces = document.querySelectorAll('.quiz__piece')



        for (let index = 0; index < pieces.length; index++) {
            const piece = pieces[index]

            if (!piece.closest('.quiz__pieces') || piece.classList.contains('fixed')) return

            if (index === 0) {
                piece.style.left = '15px'
            } else {
                const prevPiece = pieces[index - 1]
                width += prevPiece.offsetWidth + 25

                piece.style.left = width + 'px'

            }
        }

    }
}



function resizeImage(image) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");
    const board = document.querySelector('.quiz__board')

    let height = parseFloat(getComputedStyle(board).height) + 5
    let width = parseFloat(getComputedStyle(board).width) + 5


    canvas.height = height
    canvas.width = width

    context.drawImage(image, 0, 0, width, height)
    const dataUrl = canvas.toDataURL('image/png')
    const newImage = new Image()

    newImage.src = dataUrl
    return newImage
}



function setQuestion(e) {
    const questions = JSON.parse(sessionStorage.getItem('questions'))
    const piece = e.target.closest('.quiz__piece')

    // Если пазл активный или уже установлен, то он не интересует
    if (piece.classList.contains('fixed') || piece.classList.contains('active')) return

    // Обнуляем варианты ответа на вопрос
    const variants = document.querySelector('.quiz__variants')
    variants.innerHTML = ''
    variants.classList.add('active')
    // Получаем данные о вопросе
    const index = piece.dataset.pieceIndex
    const question = questions[index]

    const arrows = document.querySelectorAll('.quiz__arrow')
    for (let index = 0; index < arrows.length; index++) {
        const arrow = arrows[index]
        arrow.hidden = true
    }

    // Добавляем заголовок вопроса (сам вопрос)
    const title = document.querySelector('.quiz__title')

    if (!title.classList.contains('active')) {
        title.classList.add('active')
    }
    title.innerHTML = `
        <span>Вопрос №${+piece.dataset.pieceIndex + 1}</span>
        ${question.question}   
    `

    if (window.matchMedia('(max-width: 991.98px)').matches) {
        variants.appendChild(title)
        document.body.classList.add('lock')
        document.querySelector('.header').classList.add('active')
    }

    // Устанавливаем индекс текущего вопроса
    sessionStorage.setItem('stageIndex', index)

    // Добавляем элементы ответа в DOM
    for (let index = 0; index < question.items.length; index++) {
        const item = question.items[index]

        let letter

        switch (index) {
            case 0:
                letter = 'A'
                break;
            case 1:
                letter = 'B'
                break;
            case 2:
                letter = 'C'
                break;
        }

        const el = document.createElement('div')
        el.className = 'quiz__variant variant-quiz'
        el.innerHTML = `
            <div class="variant-quiz__body">
                <div class="variant-quiz__letter">${letter}</div>
                <p class="variant-quiz__text">${item}</p>
            </div>
        `
        el.addEventListener('click', checkAnswer)
        variants.appendChild(el)
    }

    const answerDOM = document.createElement('div')
    answerDOM.className = 'quiz__answer'
    document.querySelector('.quiz__variants').appendChild(answerDOM);



    document.querySelector('.header').classList.add('fixed')

    if (window.matchMedia('(min-width: 991.98px)').matches) {

        window.scrollTo(0, 0)
        document.querySelector('.quiz__top').classList.add('active')
        document.body.classList.add('lock')
    }
}

function checkAnswer(e) {
    // Массив ответов
    const questions = JSON.parse(sessionStorage.getItem('questions'))
    const answers = document.querySelectorAll('.quiz__variant')

    // Текущий выбранный ответ
    const answer = e.target.closest('.quiz__variant')

    // Индекс вопроса
    const questionIndex = +sessionStorage.getItem('stageIndex')

    // Получаем данные о вопросе
    const question = questions[questionIndex]

    // Переменная с правильным ответов на вопрос
    let rightAnswerIndex

    // Преобразовываем буквы вопроса в индексы для дальнейшего сравнения
    switch (question.rightAnswer.toLowerCase()) {
        case 'a':
            rightAnswerIndex = 0
            break;
        case 'b':
            rightAnswerIndex = 1
            break;
        case 'c':
            rightAnswerIndex = 2
            break;
    }


    if (document.querySelector('.variant-quiz__body.active')) return

    answer.querySelector('.variant-quiz__body').classList.add('active')

    for (let index = 0; index < answers.length; ++index) {
        const item = answers[index]

        // Если ответ правильный
        if (answer.isEqualNode(item) && rightAnswerIndex === index) {
            if (document.querySelector('.quiz__win')) continue

            const audio = new Audio('../audio/game-win-success.wav');
            audio.play();
            const el = document.createElement('div')
            const imageSrc = sessionStorage.getItem('puzzleType') === 'pea' ? 'images/puzzles/pea-win.png' : 'images/puzzles/win.png'
            el.className = 'quiz__win win-quiz'
            el.innerHTML = `
                <div class="win-quiz__top">
                    <div class="win-quiz__image">
                        <img src="${imageSrc}" alt="">
                    </div>
                    <div class="win-quiz__title">
                            Это <br>
                            правильный <br>
                            ответ!
                    </div>
                </div>
                <div class="win-quiz__text">
                    <p>В кукурузе содержатся вещества бета-каротин и лютеин, которые помогают зрению правильно развиваться!</p>
                </div>`

            if (window.matchMedia('(max-width: 991.98px)').matches) {
                document.querySelector('.quiz__board').style.position = 'relative'
                document.querySelector('.quiz__board').appendChild(el)
            } else {
                document.querySelector('.quiz').appendChild(el)
            }


            if (sessionStorage.getItem('puzzleType') === 'pea') {
                el.classList.add('pea')
            }

            setTimeout(() => {
                document.querySelector('.quiz__board').style.position = 'static'
                if (document.querySelector('.quiz__win')) {
                    document.querySelector('.quiz__win').remove()
                }
                if (document.querySelector('.variant-quiz__body.active')) {
                    document.querySelector('.variant-quiz__body.active').classList.remove('active')
                }
            }, 6000)
            const puzzle = document.querySelector(`.quiz__piece[data-piece-index="${questionIndex}"]`)

            puzzle.classList.add('active')
            if (document.querySelector('.quiz__loss')) {
                document.querySelector('.quiz__loss').remove()
            }

            resetQuestion()
            break;
        } else {
            if (document.querySelector('.quiz__loss')) continue

            const imageSrc = sessionStorage.getItem('puzzleType') === 'pea' ? 'images/puzzles/pea-loss.png' : 'images/puzzles/loss.png'
            const el = document.createElement('div')
            el.className = 'quiz__loss loss-quiz'
            el.innerHTML = `
                <div class="loss-quiz__image">
                    <img src="${imageSrc}" alt="">
                </div>
                <p class="loss-quiz__text">
                    Попробуй <br>
                    ещё раз!
                </p>`


            if (window.matchMedia('(max-width: 991.98px)').matches) {
                document.querySelector('.quiz__answer').appendChild(el)
            } else {
                document.querySelector('.quiz').appendChild(el)
            }

            if (sessionStorage.getItem('puzzleType') === 'pea') {
               el.classList.add('pea')
            }

            setTimeout(() => {
                if (document.querySelector('.quiz__loss')) {
                    document.querySelector('.quiz__loss').remove()
                }
                if (document.querySelector('.variant-quiz__body.active')) {
                    document.querySelector('.variant-quiz__body.active').classList.remove('active')
                }
            }, 6000)

        }


    }

    e.stopPropagation()
}

window.addEventListener('click', function(e) {
    if (document.querySelector('.quiz__win') && !e.target.closest('.quiz__win')) {
        document.querySelector('.quiz__board').style.position = 'static'
        document.querySelector('.quiz__win').remove()
        if (document.querySelector('.variant-quiz__body.active')) {
            document.querySelector('.variant-quiz__body.active').classList.remove('active')
        }
    }
})

window.addEventListener('click', function(e) {
    if (document.querySelector('.quiz__loss') && !e.target.closest('.quiz__loss')) {
        document.querySelector('.quiz__loss').remove()
        if (document.querySelector('.variant-quiz__body.active')) {
            document.querySelector('.variant-quiz__body.active').classList.remove('active')
        }

    }
})

window.addEventListener('resize', function() {
    setGame()
})





function setFinalPosition(piece, square) {
    const index = +piece.dataset.pieceIndex

    if (window.matchMedia("(min-width: 991.98px)").matches) {
        switch (index) {
            case 0:
                piece.style.left = square.offsetLeft + "px";
                piece.style.top = square.offsetTop - 1 + "px";
                break;
            case 1:

                piece.style.left = square.offsetLeft - 11 + "px";
                piece.style.top = square.offsetTop - 1 + "px";
                break;
            case 2:

                piece.style.left = square.offsetLeft - 43 + "px";
                piece.style.top = square.offsetTop - 1 + "px";
                break;
            case 3:
                piece.style.top = square.offsetTop - 48 + "px";
                piece.style.left = square.offsetLeft + "px";
                break;
            case 4:
                piece.style.top = square.offsetTop - 12 + "px";
                piece.style.left = square.offsetLeft - 43 + "px";
                break;
            case 5:
                piece.style.top = square.offsetTop - 47 + "px";
                piece.style.left = square.offsetLeft - 11 + "px";
                break;
            default:
                piece.style.top = square.offsetTop + "px";
                piece.style.left = square.offsetLeft + "px";
        }
    }  else {
        switch (index) {
            case 0:
                piece.style.left = square.offsetLeft + "px";
                piece.style.top = square.offsetTop + "px";

                break;
            case 1:
                piece.style.left = square.offsetLeft - 8 + "px";
                piece.style.top = square.offsetTop + "px";


                break;
            case 2:
                piece.style.left = square.offsetLeft - 28 + "px";
                piece.style.top = square.offsetTop + "px";


                break;
            case 3:
                piece.style.top = square.offsetTop - 31 + "px";
                piece.style.left = square.offsetLeft + "px";


                break;
            case 4:
                piece.style.top = square.offsetTop - 6 + "px";
                piece.style.left = square.offsetLeft - 28 + "px";

                break;
            case 5:
                piece.style.top = square.offsetTop - 32 + "px";
                piece.style.left = square.offsetLeft - 3 + "px";

                break;
        }
    }

    piece.classList.add('fixed')
    piece.removeAttribute('data-position-index')
    piece.classList.remove('active')
}


function setInitialPosition(el) {
    if (window.matchMedia('(min-width: 991.98px)').matches) {
        const index = Array.from(document.querySelectorAll('.quiz__piece')).findIndex(piece => {
            return el.isEqualNode(piece)
        })
        switch (index) {
            case 0:

                el.style.left = 0;
                el.style.top = '35px'
                el.style.right = 'auto'
                el.style.bottom = 'auto'
                break;
            case 1:

                el.style.left = 'auto';
                el.style.top = '35px'
                el.style.right = 0
                el.style.bottom = 'autp'
                break;
            case 2:
                el.style.bottom = 0;
                el.style.left = 0
                el.style.right = 'auto'
                el.style.top = 'auto'
                break;
            case 3:
                el.style.bottom = 0;
                el.style.left = "28%"
                el.style.right = 'auto'
                el.style.top = 'auto'
                break;
            case 4:
                el.style.left = "53%";
                el.style.bottom = 0;
                el.style.right = 'auto'
                el.style.top = 'auto'
                break;
            case 5:
                el.style.right = 0;
                el.style.bottom = 0
                el.style.left = 'auto'
                el.style.top = 'auto'
                break;
        }
    } else {
        const positionIndex = +el.dataset.positionIndex
        const nextEl = document.querySelector(`.quiz__piece[data-position-index="${positionIndex + 1}"]`)
        // if (!nextEl && )
        document.querySelector('.quiz__pieces').insertBefore(el, nextEl)
        el.style.top = '30px'
        el.style.transform = 'scale(0.7)'
        el.style.filter = 'grayscale(0)'
        el.classList.remove('active')

        setPiecePosition()
        el.classList.add('active')
    }


}

function setWatchPersonButton() {
    const button = document.querySelector('.game-over__button')
    const puzzleType = sessionStorage.getItem('puzzleType')

    switch (puzzleType) {
        case "corn":
            button.href = 'https://app.arhead.io/lxUbJqTU'
            break
        case "pea":
            button.href = 'https://app.arhead.io/PAB9On6i'
            break
        case "together":
            button.href = 'https://app.arhead.io/lxUbJqTU'
            break;
        default:
            button.href = 'https://app.arhead.io/PAB9On6i'
            break
    }

}



