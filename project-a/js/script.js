function setup() {
    let cnv = createCanvas(800, 500);
    cnv.parent("p5-canvas-container")
    XDraggedInRange = false;
    YDraggedInRange = false;
    stage1times = 0;
    stage1w = 28;
    stage1h = 121;
    stage1amp = 7;
    stage1freq = 41;
    circleX = random(width);
    circleY = random(height);
    stage2Y = 0;
    stage2eY = 0;
    stage2ew = 25;
    stage2eamp = 70;
    stage2dgr = 0;
    stage2dgr2 = 0;
    stage2frameCount = 0;
    stage2seconds = 10;
    stage2X = 0;
    stage3X = 0;
    stage3frameCount = 0;
    stage3seconds = 10;
    stage4X = 0;
    stage4frameCount = 0;
    stage4seconds = 15;
    stage4freq = 5;
    stage4background = 1;
    stage4a = 0;
    stage4c = 0;
    stage4ha = 255;
    stage5frameCount = 0;
    stage5X = 0;
    buttonChangeW = 0;
    buttonChangeH = 0;
    ellcolor = 50;
    stage = 0;
}

function draw() {
    textFont("Courier New");
    if (stage1times < 7) {
        stage1();
    } else if (stage2frameCount <= stage2seconds * 60 + 700) {
        stage2();
        stage2frameCount += 1;
    } else if (stage3frameCount <= (stage3seconds + 5) * 60) {
        stage3();
        stage3frameCount += 1;
    } else if (stage4c <= 255) {
        stage = 4;
        stage4();
        stage4frameCount += 1;
    } else {
        stage5();
        stage5frameCount += 1;
    }
}

function stage1() {
    background(240, 1);
    let randomVal;
    push();
    translate(width / 2, height / 2);
    if (frameCount % 6 == 0) {
        randomVal = random(-40, 40);
        for (dia = 440; dia >= 20; dia -= 10) {
            stroke(8 + dia / 4, 30);
            shade = randomVal + dia / 2 + 10;
            fill(shade, 6);
            ellipse(0, 0, dia * 0.5, dia);
        }
    }
    pop();
    push();
    translate(width / 2, height / 2);
    sinValue = stage1amp * sin(frameCount / stage1freq);
    cosValue = (stage1amp / 10) * cos((frameCount / stage1freq) * 2);
    fill(50);
    if (stage1times >= 2) {
        ellipse(0, -sinValue, stage1w + cosValue, stage1h);
    }
    ellipse(0, sinValue, stage1w + cosValue, stage1h);
    pop();
    if (frameCount % 60 == 0) {
        for (i = 0; i <= 3; i++) {
            textSize(24);
            fill(80, 0, 0);
            text("hand me the food", random(width), random(height));
        }
    }
    fill(80, 0, 0);
    if (mouseIsPressed == false && stage1times <= 6) {
        ellipse(circleX, circleY, 40, 20);
    }
}

function mousePressed() {
    XStartLocation = mouseX;
    YStartLocation = mouseY;
    if (stage == 4) {
        ellcolor = 20;
        stage4c -= 4;
        buttonChangeW = -10;
        buttonChangeH = -10;
    }
}

function mouseDragged() {
    if (XStartLocation >= circleX - 15 && XStartLocation <= circleX + 15) {
        XDraggedInRange = true;
    }
    if (YStartLocation >= circleY - 70 && YStartLocation <= circleY + 70) {
        YDraggedInRange = true;
    }
    if (stage1times < 7 && XDraggedInRange == true && YDraggedInRange == true) {
        ellipse(mouseX, mouseY, 40, 20);
    }
}

function mouseReleased() {
    ellcolor = 50;
    buttonChangeW = 0;
    buttonChangeH = 0;
    XReleasedInRange = false;
    YReleasedInRange = false;
    if (mouseX >= width / 2 - 15 && mouseX <= width / 2 + 15) {
        XReleasedInRange = true;
    }
    if (mouseY >= height / 2 - 70 && mouseY <= height / 2 + 70) {
        YReleasedInRange = true;
    }
    if (stage1times < 7 && XReleasedInRange == true && YReleasedInRange == true) {
        stage1amp += 9;
        stage1freq -= 3;
        stage1times += 1;
        stage1w += 2;
        stage1h += 2;
        circleX = random(width);
        circleY = random(height);
        ellipse(circleX, circleY, 40, 20);
    }
}

function stage2() {
    w = 35;
    h = 140;
    YSpd = 0.075;
    eYSpd = (130 / 45) * YSpd;
    amp = 70;
    freq = 20;
    dia = 30;
    level = 500;
    sca = 0.02;
    camp = 55;
    cfreq = 5;
    a = random(0.75, 1);
    d = 60;

    background(240, 1);
    let randomVal;
    push();
    translate(width / 2, height / 2);
    if (frameCount % 6 == 0) {
        randomVal = random(-40, 40);
        for (dia = 440; dia >= 20; dia -= 10) {
            stroke(8 + dia / 4, 30);
            shade = randomVal + dia / 2 + 10;
            fill(shade, 6);
            ellipse(0, 0, dia * 0.5, dia);
        }
    }
    pop();
    push();
    translate(width / 2, height / 2);
    sinValue = amp * sin(frameCount / freq);
    cosValue = stage2eamp * cos(frameCount / freq);
    wcos = (amp / 10) * cos((frameCount / freq) * 2);
    if (stage2Y <= 45) {
        stage2ew += 23 / (stage2seconds * 60 + 675);
        if (stage2frameCount >= stage2seconds * 60) {
            stage2Y += YSpd;
            stage2eY -= eYSpd;
            stage2eamp -= (70 / 45) * YSpd;
            stage2dgr += (PI / 45) * YSpd;
            stage2dgr2 += (PI / 2 / 45) * YSpd;
        }
    }
    fill(50);
    ellipse(0, stage2Y - sinValue, w + wcos, h);
    push();
    translate(0, stage2eY + cosValue);
    rotate(stage2dgr2);
    for (ed = 2; ed >= -2; ed -= 1) {
        if (ed % 2 == 0) {
            fill(0);
        } else {
            fill(225);
        }
        rotate(stage2dgr);
        ellipse(0, 0, stage2ew + ed * 4, h + ed * 4);
    }
    fill(225);
    circle(0, 0, stage2ew - 12);
    fill(0);
    circle(0, 0, 10);
    pop();

    ellipse(0, stage2Y + sinValue, w + wcos, h);
    if (stage2Y > 37 && stage2Y < 44) {
        fill(10);
        textSize(28);
        text("I can see you now.", -140, 230);
    }
    pop();
}

function stage3() {
    background(240, 1);
    a = random(0.75, 1);
    Y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    freq = 5;
    h = 150;
    eY = 295;
    ew = 50;
    eh = 140;
    eamp = 70;
    efreq = 20;
    d = 60;

    push();
    // wings
    translate(width / 2, 0);
    cosValue = amp * cos(frameCount / freq);
    sinValue = amp * sin(frameCount / freq);
    Y = level * noise(frameCount * sca);
    cX = stage3X + cosValue;
    cY = Y + sinValue;
    if (cX <= -a * (width / 2)) {
        stage3X = 0;
    } else {
        stage3X -= 5;
    }
    if (stage3frameCount <= stage3seconds * 60) {
        fill(20, ((225 / stage3seconds) * stage3frameCount) / 60);
        stroke(50, ((225 / stage3seconds) * stage3frameCount) / 60);
    } else {
        fill(20, 225);
        stroke(50, 225);
    }
    circle(cX, cY, dia);
    circle(-cX, cY, dia);
    circle(cX, cY + d, dia);
    circle(-cX, cY + d, dia);
    //bodY
    stroke(0);
    fill(50);
    ecos = (eamp / 10) * cos((frameCount / efreq) * 2);
    esin = eamp * sin(frameCount / efreq);
    ellipse(0, eY + esin, ew - 15 + ecos, eh);
    ellipse(0, eY - esin, ew - 15 + ecos, eh);
    for (ed = 8; ed >= -8; ed -= 4) {
        if (ed % 8 == 0) {
            fill(0);
        } else {
            fill(225);
        }
        ellipse(0, 120, eh + ed, ew + ed);
    }
    translate(0, 120);
    fill(225);
    cX1 = 4 * map(mouseX, 0, width, -1, 1);
    cY1 = 4 * map(mouseY, 0, height, -1, 1);
    circle(cX1, cY1, ew - 12);
    fill(0);
    cX2 = 8 * map(mouseX, 0, width, -1, 1);
    cY2 = 8 * map(mouseY, 0, height, -1, 1);
    circle(cX2, cY2, ew - 40);
    fill(10);
    textSize(28);
    if (stage3frameCount <= 150) {
        text("But I also want to see more...", -240, 360);
    } else if (stage3frameCount > 250 && stage3frameCount <= 400) {
        text("So I will let you lead me", -220, 360);
    } else if (stage3frameCount > 500 && stage3frameCount <= 650) {
        text("and I will grow stronger", -220, 360);
    }
    pop();
}

function stage4() {
    a = random(0.75, 1);
    Y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    h = 150;
    eY = 295;
    ew = 50;
    eh = 140;
    eamp = 70;
    efreq = 20;
    d = 60;

    stage4background -= 0.0003;
    background(240, stage4background);
    push();
    translate(width / 2, 0);
    // bodY
    stroke(0);
    fill(50);
    ecos = (eamp / 10) * cos((frameCount / efreq) * 2);
    esin = eamp * sin(frameCount / efreq);
    ellipse(0, eY + esin, ew - 15 + ecos, eh);
    ellipse(0, eY - esin, ew - 15 + ecos, eh);
    // wings
    stage4freq -= 0.001;
    cosValue = amp * cos(frameCount / stage4freq);
    sinValue = amp * sin(frameCount / stage4freq);
    Y = level * noise(frameCount * sca);
    cX = stage4X + cosValue;
    cY = Y + sinValue;
    if (cX <= -a * (width / 2)) {
        stage4X = 0;
    } else {
        stage4X -= 5;
    }
    fill(20, 225);
    stroke(50, 225);
    circle(cX, cY, dia);
    circle(-cX, cY, dia);
    circle(cX, cY + d, dia);
    circle(-cX, cY + d, dia);
    // head
    stage4ha -= 0.2;
    for (ed = 8; ed >= -8; ed -= 4) {
        if (ed % 8 == 0) {
            fill(0, stage4ha);
        } else {
            fill(225, stage4ha);
        }
        stroke(0, stage4ha);
        ellipse(0, 120, eh + ed, ew + ed);
    }
    // eYe
    push();
    translate(0, 120);
    if (stage4a <= 15) {
        cX1 = 4 * map(mouseX, 0, width, -1, 1);
        cY1 = 4 * map(mouseY, 0, height, -1, 1);
        cX2 = 8 * map(mouseX, 0, width, -1, 1);
        cY2 = 8 * map(mouseY, 0, height, -1, 1);
    } else {
        cX1 = 2 - random(4);
        cY1 = 2 - random(4);
        cX2 = 2 - random(4);
        cY2 = 2 - random(4);
    }
    stroke(0, stage4ha);
    fill(225, stage4ha);
    circle(cX1, cY1, ew - 12);
    fill(0, stage4ha);
    circle(cX2, cY2, ew - 40);
    pop();
    // cocoon
    if (stage4a <= 50) {
        stage4a += 0.05;
    } else if (stage4a <= 255) {
        stage4a += 2;
    } else if (stage4c <= 200) {
        stage4c += 0.5;
    } else {
        stage4c += 0.2;
    }
    for (i = 1; i <= 100; i += 3) {
        for (j = 1; j <= 51; j += 10) {
            stroke(stage4c + random(-50, 50), stage4a);
            rY1 = random(30, height - 30);
            rX1 = j * sin((rY1 - 30) / 140);
            rY2 = random(30, height - 30);
            rX2 = -j * sin((rY2 - 30) / 140);
            line(rX1, rY1, rX2, rY2);
        }
    }
    pop();
    //text
    if (stage4a <= 15) {
        fill(10);
        textSize(28);
        fill(140, 0, 0);
        r = random(-2, 2);
        text("Why can't I control this?", 200, 470);
    } else {
        if (frameCount % 40 == 0) {
            for (i = 0; i <= 3; i++) {
                textSize(28);
                fill(80, 0, 0);
                stroke(0);
                text("SAVE ME", random(width), random(height));
            }
        }
    }
    if (stage4a >= 155) {
        fill(ellcolor);
        ellipse(650, 470, 80 + buttonChangeW, 50 + buttonChangeH);
        fill(220);
        textSize(14);
        text("SAVE ME", 620, 475);
    }
}

function stage5() {
    a = random(0.75, 1);
    Y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    h = 150;

    // background(240, 1)
    push();
    translate(width / 2, 0);
    stage4c = 300;
    // cocoon
    stage5a = 255;
    stage5c = 255;
    for (i = 1; i <= 100; i += 3) {
        for (j = 1; j <= 51; j += 10) {
            stroke(stage4c + random(-50, 50), stage5a);
            rY1 = random(30, height - 30);
            rX1 = j * sin((rY1 - 30) / 140);
            rY2 = random(30, height - 30);
            rX2 = -j * sin((rY2 - 30) / 140);
            line(rX1, rY1, rX2, rY2);
        }
    }
    // text1
    if (frameCount % 40 == 0) {
        for (i = 0; i <= 3; i++) {
            textSize(28);
            fill(80, 0, 0);
            stroke(0);
            text("SAVE ME", random(-width / 2, width / 2), random(height));
        }
    }
    //the circle
    fill(0, 50);
    noStroke();
    ellipse(0, height / 2, stage5frameCount * 2, stage5frameCount * 2);
    // text2
    stroke(0);
    fill(240);
    textSize(28);
    text("I cannot see You now.", -160, 530);
    pop();
}