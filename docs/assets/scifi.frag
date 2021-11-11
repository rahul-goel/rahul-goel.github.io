// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define eps 0.0015

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale){
	return mat2(_scale.x,0.0,
			0.0,_scale.y);
}

mat2 rotate2d(float _angle){
	return mat2(cos(_angle),-sin(_angle),
			sin(_angle),cos(_angle));
}

float circle(vec2 st, float radius) {
	vec2 d = st - vec2(0.5);
	float inside = smoothstep(radius + eps, radius, sqrt(dot(d, d)));
	return inside;
}

float barecircle(vec2 st, float radius) {
	vec2 d = st - vec2(0.5);
	float outside = smoothstep(radius - eps, radius, sqrt(dot(d, d)));
	float inside = smoothstep(radius + eps, radius, sqrt(dot(d, d)));
	return min(outside, inside);
}

float barecircle(vec2 st, float radius, float epsilon) {
	vec2 d = st - vec2(0.5);
	float outside = smoothstep(radius - epsilon, radius, sqrt(dot(d, d)));
	float inside = smoothstep(radius + epsilon, radius, sqrt(dot(d, d)));
	return min(outside, inside);
}

float barearc(vec2 st, float radius, float angle) {
	vec2 d = st - vec2(0.5);
	float cur_angle = atan(d.y, d.x); // using this version with both arguments gives result in [-pi,pi]
	float within_angle = step(0.0, cur_angle) * (1.0 - step(angle, cur_angle));
	float outside = smoothstep(radius - eps, radius, sqrt(dot(d, d)));
	float inside = smoothstep(radius + eps, radius, sqrt(dot(d, d)));
	return within_angle * min(outside, inside);
}

float barearc(vec2 st, float radius, float angle, float epsilon) {
	vec2 d = st - vec2(0.5);
	float cur_angle = atan(d.y, d.x); // using this version with both arguments gives result in [-pi,pi]
	float within_angle = step(0.0, cur_angle) * (1.0 - step(angle, cur_angle));
	float outside = smoothstep(radius - epsilon, radius, sqrt(dot(d, d)));
	float inside = smoothstep(radius + epsilon, radius, sqrt(dot(d, d)));
	return within_angle * min(outside, inside);
}

float drawline(vec2 p1, vec2 p2, vec2 st) {
	float a = abs(distance(p1, st));
	float b = abs(distance(p2, st));
	float c = abs(distance(p1, p2));

	if (a >= c || b >= c) return 0.0;
	float p = (a + b + c) * 0.5;
	float h = 2.0 / c * sqrt( p * ( p - a) * ( p - b) * ( p - c));
	return mix(1.0, 0.0, smoothstep(0.5 * eps, 1.5 * eps, h));
}

float make_arcs(vec2 st) {
	float ret = 0.0;

	float rt_angle = 0.0;
	st -= vec2(0.5);
	rt_angle = 0.5 - sin(u_time) / 2.0;
	st = rotate2d(rt_angle) * st;
	st += vec2(0.5);
	ret += barearc(st, 0.33, 2.0 + sin(u_time));
	st -= vec2(0.5);
	st = rotate2d(-rt_angle) * st;
	st += vec2(0.5);

	st -= vec2(0.5);
	rt_angle = -PI + 0.5 - sin(u_time) / 2.0;
	st = rotate2d(rt_angle) * st;
	st += vec2(0.5);
	ret += barearc(st, 0.33, 2.0 + sin(u_time));
	st -= vec2(0.5);
	st = rotate2d(-rt_angle) * st;
	st += vec2(0.5);

	return ret;
}

float radar_line(vec2 st) {
	vec2 rdc = vec2(0.5) + vec2(cos(u_time * 2.0), sin(u_time * 2.0)) * 0.3;
	float ret =  drawline(rdc, vec2(0.5), st);

	vec2 a = rdc - vec2(0.5);
	vec2 b = st - vec2(0.5);

	float sangle = asin((a.x * b.y - a.y * b.x) / (length(a) * length(b)));
	float cangle = asin(dot(a, b) / (length(a) * length(b)));
	if (sangle <= 0.0) ret = max(ret, pow(max(sin(cangle), 0.0), 2.5));

	ret *= 1.0 - step(0.3, length(b));

	return ret;
}

float white_dots(vec2 st) {
	st += 0.21 * cos(u_time * PI * 0.1) * vec2(2.0 * cos(u_time), 1.5 * sin(u_time));
	return circle(st, 0.005);
}

float expand_circle(vec2 st, float radius) {
	vec2 d = st - vec2(0.5);
	float outside = smoothstep(radius + eps, radius, sqrt(dot(d, d)));
	float inside = smoothstep(radius - radius * 0.25, radius, sqrt(dot(d, d)));
	return min(outside, inside);
}

float enemy_circle(vec2 st) {
	st += 0.21 * cos(10.0 + u_time * PI * 0.1) * vec2(1.5 * cos(u_time), 0.9 * sin(u_time));
	float ret = 0.0;
	ret += circle(st, 0.007) * (sign(sin(u_time * 15.0)) + 1.0) / 2.0;
	ret += barecircle(st, 0.01);
	float exp_radius = fract(u_time) * 0.1;
	ret += expand_circle(st, exp_radius);
	return ret;
}

float make_static_arc(vec2 st) {
	float ret = 0.0;
	float dif = 0.02;

	st -= vec2(0.5);
	st = rotate2d(dif * PI) * st;
	st += vec2(0.5);
	ret += barearc(st, 0.4, (1.0 - dif * 2.0) * PI, 0.005);

	st -= vec2(0.5);
	st = rotate2d(1.0 * PI) * st;
	st += vec2(0.5);
	ret += barearc(st, 0.4, (1.0 - dif * 2.0) * PI, 0.005);
	return ret;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

	vec3 cyan = vec3(32.0, 178.0, 170.0) / 255.0;
	vec3 white = vec3(1.0);
	vec3 red = vec3(1.0, 0.3, 0.0);
	vec3 color = vec3(0.0);

	// static circles
	color += cyan * vec3(barecircle(st, 0.1));
	color += cyan * vec3(barecircle(st, 0.2));
	color += white * vec3(barecircle(st, 0.3, 0.003));
	color += white * vec3(circle(st, 0.005));

	// moving arcs
	color += cyan * make_arcs(st);

	// radar line
	color += cyan * radar_line(st);

	// white dot
	color += white * white_dots(st);

	// red dot
	float ec = enemy_circle(st);
	if (ec > 0.3) color = ec * red;

	// static arcs
	color += cyan * vec3(make_static_arc(st));

	gl_FragColor = vec4(color,1.0);
}
