"""Independent derivation of every numerical in Ch.2 Mechanical Properties of Fluids.
Computed from the STEM only. Book answers deliberately not consulted here."""
import math

pi = math.pi
out = []


def p(ref, s):
    out.append(f"{ref}: {s}")


# Q.10 pressure 200 m below ocean, P0 = 1 atm, rho = 1060
P0 = 1.013e5
h = 200.0
rho = 1060.0
for g in (9.8, 9.81):
    P = P0 + rho * g * h
    p("Q.10", f"g={g}: rho*g*h={rho*g*h:.6g}, P = {P:.6g} N/m^2  (= {P/1.013e5:.4g} atm)")

# Q.11 hydraulic lift
Ain, Aout, Fin = 30.0, 1500.0, 25.0
p("Q.11", f"F_out = {Fin} * {Aout}/{Ain} = {Fin*Aout/Ain:.6g} N")

# Q.12 Stokes viscous force on raindrop
r = 0.5e-3
v = 2.0
eta = 1.8e-5
F = 6 * pi * eta * r * v
p("Q.12", f"F = 6*pi*eta*r*v = {F:.6g} N")

# Q.13 coefficient of viscosity from plate on oil layer
F13, A13, v13, d13 = 1.0, 1e-2, 2e-2, 1.5e-3
eta13 = F13 * d13 / (A13 * v13)
p("Q.13", f"eta = F*d/(A*v) = {eta13:.6g} Ns/m^2 (Pa s) = {eta13*10:.6g} poise")

# Q.14 terminal velocity of a rising air bubble
r14 = 0.2e-3          # 0.4 mm diameter
eta14 = 0.1
rho_liq = 0.9 * 1000.0
rho_air = 1.29
for g in (9.8, 9.81):
    v14 = (2.0 / 9.0) * r14 ** 2 * (rho_liq - rho_air) * g / eta14
    p("Q.14", f"g={g}: v = (2/9) r^2 (rho_l - rho_air) g / eta = {v14:.6g} m/s  (= {v14*1000:.4g} mm/s), upward")
    v14b = (2.0 / 9.0) * r14 ** 2 * rho_liq * g / eta14   # ignoring air density
    p("Q.14", f"   if air density ignored: {v14b:.6g} m/s")

# Q.15 continuity, diameters
d1, u1, u2 = 10.0, 2.0, 4.0
d2 = d1 * math.sqrt(u1 / u2)
p("Q.15", f"d2 = d1*sqrt(v1/v2) = {d2:.6g} cm  (= {d2/100:.6g} m)")

# Q.16 efflux from gauge pressure
Pg = 4e5
rho16 = 1000.0
v16 = math.sqrt(2 * Pg / rho16)
p("Q.16", f"v = sqrt(2P/rho) = {v16:.6g} m/s")

# Q.17 Bernoulli, pressure drop drives flow
dP = 3e5 - 2e5
v17 = math.sqrt(2 * dP / 1000.0)
p("Q.17", f"v = sqrt(2*dP/rho) = {v17:.6g} m/s")

# Q.18 capillary rise
T18, r18, rho18, g18 = 7e-2, 0.1e-3, 1000.0, 9.8
h18 = 2 * T18 * 1.0 / (r18 * rho18 * g18)
p("Q.18", f"h = 2T cos0/(r rho g) = {h18:.6g} m  (= {h18*100:.5g} cm)")

# Q.19 gauge pressure inside an AIR BUBBLE in water -> ONE surface -> 2T/r
T19, r19 = 7.2e-2, 0.2e-3
p("Q.19", f"single surface 2T/r = {2*T19/r19:.6g} N/m^2   [DROP/CAVITY form]")
p("Q.19", f"two surfaces 4T/r  = {4*T19/r19:.6g} N/m^2   [soap-bubble form, NOT applicable]")

# Q.20 27 droplets coalesce
T20, r20, n20 = 0.072, 0.1e-3, 27
R20 = n20 ** (1 / 3) * r20
dA = 4 * pi * (n20 * r20 ** 2 - R20 ** 2)
p("Q.20", f"R = {R20:.6g} m; dA = {dA:.6g} m^2; dE = T*dA = {T20*dA:.6g} J (a DECREASE)")

# Q.21 mercury drop broken into 8
T21 = 435.5 * 1e-5 / 1e-2     # dyne/cm -> N/m
R21 = 0.2e-2
r21 = R21 / 8 ** (1 / 3)
dA21 = 4 * pi * (8 * r21 ** 2 - R21 ** 2)
p("Q.21", f"T = {T21:.6g} N/m; r = {r21:.6g} m; dA = {dA21:.6g} m^2; W = {T21*dA21:.6g} J = {T21*dA21*1e7:.6g} erg")

# Q.22 soap bubble, work to form
T22, R22 = 0.07, 0.02
W22 = T22 * 2 * 4 * pi * R22 ** 2
p("Q.22", f"W = T * 2*(4 pi R^2) = {W22:.6g} J   [two surfaces]")
p("Q.22", f"one-surface value would be {W22/2:.6g} J")

# Q.23 soap film on a frame, 2x2 -> 3x3
T23 = 3e-2
dA23 = 2 * ((0.03) ** 2 - (0.02) ** 2)
p("Q.23", f"dA = 2*(0.03^2 - 0.02^2) = {dA23:.6g} m^2; W = {T23*dA23:.6g} J")
p("Q.23", f"one-surface value would be {T23*dA23/2:.6g} J")

print("\n".join(out))
