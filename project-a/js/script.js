function setup() {
    let cnv = createCanvas(800, 500);
    cnv.parent("p5-canvas-container")
    xDraggedInRange = false;
    yDraggedInRange = false;
    s1times = 0;
    s1w = 28;
    s1h = 121;
    s1amp = 7;
    s1freq = 41;
    circlex = random(width);
    circley = random(height);
    s2y = 0;
    s2ey = 0;
    s2ew = 25;
    s2eamp = 70;
    s2dgr = 0;
    s2dgr2 = 0;
    s2fc = 0;
    s2scs = 10;
    s2x = 0;
    s3x = 0;
    s3fc = 0;
    s3scs = 10;
    s4x = 0;
    s4fc = 0;
    s4scs = 15;
    s4freq = 5;
    s4background = 1;
    s4a = 0;
    s4c = 0;
    s4ha = 255;
    s5frameCount = 0;
    s5x = 0;
    buttonChangeW = 0;
    buttonChangeH = 0;
    ellcolor = 50;
    stage = 0;
}

function draw() {
    textFont("Courier New");
    if (s1times < 7) {
        s1();
    } else if (s2fc <= s2scs * 60 + 700) {
        s2();
        s2fc += 1;
    } else if (s3fc <= (s3scs + 5) * 60) {
        s3();
        s3fc += 1;
    } else if (s4c <= 255) {
        stage = 4;
        s4();
        s4fc += 1;
    } else {
        s5();
        s5frameCount += 1;
    }
}

function s1() {
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
    sinValue = s1amp * sin(frameCount / s1freq);
    cosValue = (s1amp / 10) * cos((frameCount / s1freq) * 2);
    fill(50);
    if (s1times >= 2) {
        ellipse(0, -sinValue, s1w + cosValue, s1h);
    }
    ellipse(0, sinValue, s1w + cosValue, s1h);
    pop();
    if (frameCount % 60 == 0) {
        for (i = 0; i <= 3; i++) {
            textSize(24);
            fill(80, 0, 0);
            text("hand me the food", random(width), random(height));
        }
    }
    fill(80, 0, 0);
    if (mouseIsPressed == false && s1times <= 6) {
        ellipse(circlex, circley, 40, 20);
    }
}

function mousePressed() {
    xStartLocation = mouseX;
    yStartLocation = mouseY;
    if (stage == 4) {
        ellcolor = 20;
        s4c -= 4;
        buttonChangeW = -10;
        buttonChangeH = -10;
    }
}

function mouseDragged() {
    if (xStartLocation >= circlex - 15 && xStartLocation <= circlex + 15) {
        xDraggedInRange = true;
    }
    if (yStartLocation >= circley - 70 && yStartLocation <= circley + 70) {
        yDraggedInRange = true;
    }
    if (s1times < 7 && xDraggedInRange == true && yDraggedInRange == true) {
        if (s1times < 6) {
            ellipse(mouseX, mouseY, 40, 20);
        }
    }
}

function mouseReleased() {
    ellcolor = 50;
    buttonChangeW = 0;
    buttonChangeH = 0;
    xReleasedInRange = false;
    yReleasedInRange = false;
    if (mouseX >= width / 2 - 15 && mouseX <= width / 2 + 15) {
        xReleasedInRange = true;
    }
    if (mouseY >= height / 2 - 70 && mouseY <= height / 2 + 70) {
        yReleasedInRange = true;
    }
    if (s1times < 7 && xReleasedInRange == true && yReleasedInRange == true) {
        s1amp += 9;
        s1freq -= 3;
        s1times += 1;
        s1w += 2;
        s1h += 2;
        circlex = random(width);
        circley = random(height);
        ellipse(circlex, circley, 40, 20);
    }
}

function s2() {
    w = 35;
    h = 140;
    ySpd = 0.075;
    eySpd = (130 / 45) * ySpd;
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
    cosValue = s2eamp * cos(frameCount / freq);
    wcos = (amp / 10) * cos((frameCount / freq) * 2);
    if (s2y <= 45) {
        s2ew += 23 / (s2scs * 60 + 675);
        if (s2fc >= s2scs * 60) {
            s2y += ySpd;
            s2ey -= eySpd;
            s2eamp -= (70 / 45) * ySpd;
            s2dgr += (PI / 45) * ySpd;
            s2dgr2 += (PI / 2 / 45) * ySpd;
        }
    }
    fill(50);
    ellipse(0, s2y - sinValue, w + wcos, h);
    push();
    translate(0, s2ey + cosValue);
    rotate(s2dgr2);
    for (ed = 2; ed >= -2; ed -= 1) {
        if (ed % 2 == 0) {
            fill(0);
        } else {
            fill(225);
        }
        rotate(s2dgr);
        ellipse(0, 0, s2ew + ed * 4, h + ed * 4);
    }
    fill(225);
    circle(0, 0, s2ew - 12);
    fill(0);
    circle(0, 0, 10);
    pop();

    ellipse(0, s2y + sinValue, w + wcos, h);
    if (s2y > 37 && s2y < 44) {
        fill(10);
        textSize(28);
        text("I can see you now.", -140, 230);
    }
    pop();
}

function s3() {
    background(240, 1);
    a = random(0.75, 1);
    y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    freq = 5;
    h = 150;
    ey = 295;
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
    y = level * noise(frameCount * sca);
    cx = s3x + cosValue;
    cy = y + sinValue;
    if (cx <= -a * (width / 2)) {
        s3x = 0;
    } else {
        s3x -= 5;
    }
    if (s3fc <= s3scs * 60) {
        fill(20, ((225 / s3scs) * s3fc) / 60);
        stroke(50, ((225 / s3scs) * s3fc) / 60);
    } else {
        fill(20, 225);
        stroke(50, 225);
    }
    circle(cx, cy, dia);
    circle(-cx, cy, dia);
    circle(cx, cy + d, dia);
    circle(-cx, cy + d, dia);
    //body
    stroke(0);
    fill(50);
    ecos = (eamp / 10) * cos((frameCount / efreq) * 2);
    esin = eamp * sin(frameCount / efreq);
    ellipse(0, ey + esin, ew - 15 + ecos, eh);
    ellipse(0, ey - esin, ew - 15 + ecos, eh);
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
    cx1 = 4 * map(mouseX, 0, width, -1, 1);
    cy1 = 4 * map(mouseY, 0, height, -1, 1);
    circle(cx1, cy1, ew - 12);
    fill(0);
    cx2 = 8 * map(mouseX, 0, width, -1, 1);
    cy2 = 8 * map(mouseY, 0, height, -1, 1);
    circle(cx2, cy2, ew - 40);
    fill(10);
    textSize(28);
    if (s3fc <= 150) {
        text("But I also want to see more...", -240, 360);
    } else if (s3fc > 250 && s3fc <= 400) {
        text("So I will let you lead me", -220, 360);
    } else if (s3fc > 500 && s3fc <= 650) {
        text("and I will grow stronger", -220, 360);
    }
    pop();
}

function s4() {
    a = random(0.75, 1);
    y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    h = 150;
    ey = 295;
    ew = 50;
    eh = 140;
    eamp = 70;
    efreq = 20;
    d = 60;

    s4background -= 0.0003;
    background(240, s4background);
    push();
    translate(width / 2, 0);
    // body
    stroke(0);
    fill(50);
    ecos = (eamp / 10) * cos((frameCount / efreq) * 2);
    esin = eamp * sin(frameCount / efreq);
    ellipse(0, ey + esin, ew - 15 + ecos, eh);
    ellipse(0, ey - esin, ew - 15 + ecos, eh);
    // wings
    s4freq -= 0.001;
    cosValue = amp * cos(frameCount / s4freq);
    sinValue = amp * sin(frameCount / s4freq);
    y = level * noise(frameCount * sca);
    cx = s4x + cosValue;
    cy = y + sinValue;
    if (cx <= -a * (width / 2)) {
        s4x = 0;
    } else {
        s4x -= 5;
    }
    fill(20, 225);
    stroke(50, 225);
    circle(cx, cy, dia);
    circle(-cx, cy, dia);
    circle(cx, cy + d, dia);
    circle(-cx, cy + d, dia);
    // head
    s4ha -= 0.2;
    for (ed = 8; ed >= -8; ed -= 4) {
        if (ed % 8 == 0) {
            fill(0, s4ha);
        } else {
            fill(225, s4ha);
        }
        stroke(0, s4ha);
        ellipse(0, 120, eh + ed, ew + ed);
    }
    // eye
    push();
    translate(0, 120);
    if (s4a <= 15) {
        cx1 = 4 * map(mouseX, 0, width, -1, 1);
        cy1 = 4 * map(mouseY, 0, height, -1, 1);
        cx2 = 8 * map(mouseX, 0, width, -1, 1);
        cy2 = 8 * map(mouseY, 0, height, -1, 1);
    } else {
        cx1 = 2 - random(4);
        cy1 = 2 - random(4);
        cx2 = 2 - random(4);
        cy2 = 2 - random(4);
    }
    stroke(0, s4ha);
    fill(225, s4ha);
    circle(cx1, cy1, ew - 12);
    fill(0, s4ha);
    circle(cx2, cy2, ew - 40);
    pop();
    // cocoon
    if (s4a <= 50) {
        s4a += 0.05;
    } else if (s4a <= 255) {
        s4a += 2;
    } else if (s4c <= 200) {
        s4c += 0.5;
    } else {
        s4c += 0.2;
    }
    for (i = 1; i <= 100; i += 3) {
        for (j = 1; j <= 51; j += 10) {
            stroke(s4c + random(-50, 50), s4a);
            ry1 = random(30, height - 30);
            rx1 = j * sin((ry1 - 30) / 140);
            ry2 = random(30, height - 30);
            rx2 = -j * sin((ry2 - 30) / 140);
            line(rx1, ry1, rx2, ry2);
        }
    }
    pop();
    //text
    if (s4a <= 15) {
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
    if (s4a >= 255) {
        fill(ellcolor);
        ellipse(650, 470, 80 + buttonChangeW, 50 + buttonChangeH);
        fill(220);
        textSize(14);
        text("SAVE ME", 620, 475);
    }
}

function s5() {
    a = random(0.75, 1);
    y = height / 3;
    dia = 30;
    level = 500;
    sca = 0.02;
    amp = 55;
    h = 150;

    background(240, 60)
    push();
    translate(width / 2, 0);
    s4c = 300;
    // cocoon
    s5a = 255;
    s5c = 255;
    for (i = 1; i <= 100; i += 3) {
        for (j = 1; j <= 51; j += 10) {
            stroke(s4c + random(-50, 50), s5a);
            ry1 = random(30, height - 30);
            rx1 = j * sin((ry1 - 30) / 140);
            ry2 = random(30, height - 30);
            rx2 = -j * sin((ry2 - 30) / 140);
            line(rx1, ry1, rx2, ry2);
        }
    }
    //the circle
    fill(0, 50);
    noStroke();
    ellipse(0, height / 2, s5frameCount, s5frameCount);
    pop();
}