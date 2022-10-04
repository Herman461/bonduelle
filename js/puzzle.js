const imageObj = new Image(475, 320);


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

const questions = [
    {
        id: 1,
        question: 'Как кукуруза помогает улучшать зрение?',
        items: [
            'С помощью витаминов и полезных веществ',
            'Если на неё долго смотреть, то начнёшь лучше видеть',
            'С помощью витаминов и полезных веществ',
        ],
        explanation: 'В кукурузе содержатся вещества бета-каротин и лютеин, которые помогают зрению правильно развиваться!',
        rightAnswer: 'a'
    },
    {
        id: 2,
        question: 'Почему кукуруза даёт тебе супер-силу?',
        items: [
            'Потому что она сама супер!',
            'Поднимая банки с кукурузой много раз, ты станешь сильнее',
            'Её полезные вещества укрепляют мышцы',
        ],
        explanation: 'Кукуруза помогает мышцам и костям стать крепче, благодаря высокому содержанию белка, чтобы у тебя было больше сил!',
        rightAnswer: 'c'
    },
    {
        id: 3,
        question: 'Как кукуруза защищает от болезней?',
        items: [
            'Она умеет улучшать иммунитет',
            'Намажься её зёрнами целиком, и никогда не заболеешь',
            'Из неё можно сделать щит от любой заразы',
        ],
        explanation: 'Пищевые волокна, клетчатка и другие полезные вещества в кукурузе помогают противостоять вирусам и бактериям и укрепляют твоё здоровье!',
        rightAnswer: 'a'
    },
    {
        id: 4,
        question: 'Почему кукуруза очень полезна для детей?',
        items: [
            'Потому что её собирают, когда она молодая',
            'Из неё можно сделать немало полезных вещей',
            'В ней много витаминов для роста',
        ],
        explanation: 'В кукурузе содержатся витамины А и Е, кальций, железо и другие вещества, очень полезные для роста и развития молодого организма!',
        rightAnswer: 'c'
    },
    {
        id: 5,
        question: 'Как кукуруза улучшает ум?',
        items: [
            'Соком кукурузы написано много умных книжек',
            'С помощью полезных витаминов',
            'Если сосчитать все зёрнышки в банке, то станешь умнее',
        ],
        explanation: 'Витамины группы B, которые содержатся в кукурузе, положительно влияют на центральную нервную систему!',
        rightAnswer: 'b'
    },
    {
        id: 6,
        question: 'Почему молодая кукуруза такая сладкая?',
        items: [
            'Потому что она растёт рядом со сладкими фруктами и ягодами',
            'Потому что в банки с ней добавляют конфеты',
            'Она сладкая от природы',
        ],
        explanation: 'Молодая кукуруза сладкая от природы, и в баночки с ней не добавляют сахар, поэтому она такая полезная!',
        rightAnswer: 'c'
    },
]

function dragElement(el) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    el.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.top = el.offsetTop - pos2 + "px";
        el.style.left = el.offsetLeft - pos1 + "px";

    }

    function stopElementDrag(e) {
        document.onpointerup = null;
        document.onpointermove = null;

        const squares = document.querySelectorAll('.quiz__square')
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

            const x = puzzleX - squareX > -40 && puzzleX - squareX + 100 < puzzleWidth
            const y = puzzleY - squareY > -40 && puzzleY - squareY + 100 < puzzleHeight


            if (x && y)  {



                switch (index) {
                    case 1:
                        el.style.left = square.offsetLeft - 11 + "px";
                        el.style.top = square.offsetTop + "px";
                        break;
                    case 2:
                        el.style.left = square.offsetLeft - 43 + "px";
                        el.style.top = square.offsetTop + "px";
                        break;
                    case 3:
                        el.style.top = square.offsetTop - 48 + "px";
                        el.style.left = square.offsetLeft + "px";
                        break;
                    case 4:
                        el.style.top = square.offsetTop - 20 + "px";
                        el.style.left = square.offsetLeft - 30 + "px";
                        break;
                    default:
                        el.style.top = square.offsetTop + "px";
                        el.style.left = square.offsetLeft + "px";
                }
                break;
            }
        }




    }
}



imageObj.onload = async function() {
    let index = 0;
    for (let h = 0; h < 2; h++) {
        let sourceY = 0

        if (h !== 0) {
            sourceY = h * data[index - 1].height
        }
        let sourceX = 0
        for (let w = 0; w < 3; w++) {
            const canvas = document.createElement('canvas')
            const item = data[index]

            const context = canvas.getContext('2d');



            if (w !== 0) {
                sourceX += data[index - 1].width;
            }

            canvas.height = item.height
            canvas.width = item.width

            context.width = String(item.width)
            context.height = String(item.height)

            const updatedImage = resizeImage(imageObj)



            switch (index) {
                case 0:
                    context.drawImage(updatedImage, sourceX, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 1:
                    context.drawImage(updatedImage, sourceX - 56, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 2:
                    context.drawImage(updatedImage, 270, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 3:
                    context.drawImage(updatedImage, sourceX, sourceY - 56, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 4:
                    context.drawImage(updatedImage, sourceX - 56, sourceY, item.width, item.height - 20, 0, 0, item.width, item.height);
                    break;
                case 5:
                    context.drawImage(updatedImage, 220, sourceY - 56, item.width, item.height, 0, 0, item.width, item.height);
                    break;
            }
            item.href = canvas.toDataURL()
            await setPuzzleForm(index)

            index++;
        }
    }

};

imageObj.src = 'images/test2.jpg';

function resizeImage(image) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");
    canvas.height = 320
    canvas.width = 475
    context.drawImage(image, 0, 0, 472, 316)

    const dataUrl = canvas.toDataURL('image/jpeg')
    const newImage = new Image()

    newImage.src = dataUrl
    return newImage
}


async function setPuzzleForm(index) {
    const item = data[index]

    const wrapper = document.createElement('div')

    const doc = new DOMParser()

    const response = await fetch(item.imageSrc)
    const str = await response.text()
    const svgImage = await doc.parseFromString(str, "image/svg+xml")

    svgImage.querySelector('image').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', item.href);

    svgImage.querySelector('image').setAttribute( 'width', item.width);
    svgImage.querySelector('image').setAttribute( 'height', item.height);

    svgImage.querySelector('svg').setAttribute('viewBox', '0 0 ' + item.width + ' ' + item.height)
    svgImage.querySelector('svg').setAttribute('width', item.width)
    svgImage.querySelector('svg').setAttribute('height', item.height)

    wrapper.appendChild(svgImage.documentElement)

    // document.querySelector('.quiz__puzzles').appendChild(wrapper)
    document.querySelector('body').appendChild(wrapper)

    wrapper.dataset.pieceIndex = index

    wrapper.className = 'quiz__piece'

    wrapper.style.width = item.width + 'px'
    wrapper.style.height = item.height + 'px'






    wrapper.addEventListener('click', setQuestion)
    dragElement(wrapper)
    wrapper.addEventListener( 'touchmove', function(e) {
        e.preventDefault()
    })
}

function setQuestion(e) {
    const variants = document.querySelector('.quiz__variants')
    variants.innerHTML = ''



    const index = e.target.closest('.quiz__piece').dataset.pieceIndex
    const question = questions[index]

    const title = document.querySelector('.quiz__title')

    if (!title.classList.contains('active')) {
        title.classList.add('active')
    }

    title.textContent = question.question

    sessionStorage.setItem('stageIndex', index)

    for (let index = 0; index < question.items.length; index++) {
        const item = question.items[index]

        let letter;
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
}

function checkAnswer(e) {
    const answers = document.querySelectorAll('.quiz__variant')
    const answer = e.target.closest('.quiz__variant')
    const questionIndex = +sessionStorage.getItem('stageIndex')
    const question = questions[questionIndex]

    let rightAnswerIndex

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

    answer.querySelector('.variant-quiz__body').classList.add('active')

    for (let index = 0; index < answers.length; index++) {
        const item = answers[index]


        // Если ответ правильный
        if (answer.isEqualNode(item) && rightAnswerIndex === index) {
            const el = document.createElement('div')
            el.innerHTML = `
                <div class="quiz__win win-quiz">
                    <div class="win-quiz__top">
                        <div class="win-quiz__image">
                            <img src="images/puzzles/win.png" alt="">
                        </div>
                        <div class="win-quiz__title">
                            Это <br>
                            правильный <br>
                            ответ!
                        </div>
                    </div>
                    <div class="win-quiz__text">
                        <p>В кукурузе содержатся вещества бета-каротин и лютеин, которые помогают зрению правильно развиваться!</p>
                    </div>
                </div>
            `
            document.querySelector('.quiz').appendChild(el)
        }
    }
}

