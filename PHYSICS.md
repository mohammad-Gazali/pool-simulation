# **1. Introduction**

The game of billiards has been studied for over 200 years. Among the most important contributions are the research of Newton, which focused on the physical motion of most objects, including collision motion — the foundation for dedicated studies of billiards. To understand the motion of a billiard ball, we must recognize that there are four main aspects of its motion:

- The ball's motion on the playing table surface, which includes friction forces, ball rotation, and rolling.
- The ball's motion when colliding with another ball.
- The ball's motion when colliding with the table cushions.
- The ball's motion when struck by the billiard cue.

The following assumptions will be used in studying ball motion:

1. The effect of air resistance on ball motion will be neglected.
2. The balls will be identical in size and weight, conforming to standard specifications used in all billiard tables; all balls are assumed to meet these standards.
3. The billiard table is flat and horizontal, so there will be no effect from gravity or its reaction force.
4. Standard friction and restitution constants will be adopted, as commonly used in most billiard tables and balls; these will be mentioned in the next section.
5. The table cushions are soft (not completely rigid) and are inclined at a specific angle to be discussed later.
6. A standard-specification cue will be used; its related constants will be mentioned in the next section.

---

# **2. Physical Properties of the Game Components**

## Billiard Ball Properties

- Ball diameter: 2.25 inches (57.15 mm)
- Ball mass: 170 g
- Moment of inertia of the ball: **I = (2/5) m R²**

## Friction Coefficients

- Ball-to-ball friction coefficient **μ_bb**: 0.03 – 0.08
- Ball-to-ball restitution coefficient **e_bb**: 0.92 – 0.98
- Rolling friction coefficient between ball and surface **μ_r**: 0.005 – 0.015
- Sliding friction coefficient between ball and surface **μ_s**: 0.15 – 0.4 (0.2 in normal conditions)
- Ball-to-cushion restitution coefficient **e_bc**: 0.6 – 0.9
- Friction coefficient between cue tip and ball **μ_tip**: 0.6
- Restitution coefficient between cue tip and ball **e_tip**: 0.71 – 0.75 (for a leather tip)

## Other Constants

- Rotational deceleration rate between ball and surface: 5 – 15 **rad/s²**
- Ball-to-surface restitution coefficient **e_bs**: 0.5 – 0.7

---

# **3. Ball Motion on the Table Surface**

The ball has four possible states in relation to the surface:

1. **Rest state**: No motion at all.
2. **Spinning state**: The ball rotates around itself (spin only).
3. **Rolling without slipping**.
4. **Rolling with slipping**.

---

## Rest State

In this state, the ball is completely stationary. The component equations are:

$$\mathbf{r}(t) = \mathbf{r}_0$$

$$\mathbf{v}(t) = \mathbf{0}$$

$$\boldsymbol{\omega}(t) = \mathbf{0}$$

Where:
- **r(t)**: position vector as a function of time
- **r₀**: initial position vector
- **v(t)**: linear velocity vector as a function of time
- **ω(t)**: angular velocity vector as a function of time

---

## Spinning State

Rotation about the z-axis only is a constraint imposed in this state, because if we also take rotation about x and y into account, that would generate a friction force against the surface which would produce linear velocity — which is not what we want to model here. Therefore, if the net rotation is only around the z-axis, the linear velocity will be zero.

To determine the equation of rotational motion, we note that there is a contact point between the surface and the ball. When the ball spins, the force is dissipated due to the friction between the ball and the surface.

*However, when rotation is about a single point, this does not generate a friction force. To explain this logically, the contact region between the ball and the surface is an area (not a point), but this complicates our mathematical model. To resolve this, we introduce a phenomenological friction coefficient that causes the ball's spin to decelerate to zero.*

*This coefficient is added to the model temporarily to account for a phenomenon (in this case, deceleration of ball spin) that does not arise from the model's assumptions. This is what researchers do when they want to model an observation but their model is insufficient — it is a form of scientific simplification.*

The component equations for this state are:

$$\mathbf{r}(t) = \mathbf{r}_0$$

$$\mathbf{v}(t) = \mathbf{0}$$

$$\boldsymbol{\omega}(t) = \boldsymbol{\omega}_0 - \frac{\mu_{sp}\, g}{R}\, \hat{\boldsymbol{\omega}}_0\, t$$

With the constraint:

$$\omega_x = \omega_y = 0$$

Where:
- **R**: ball radius
- **ω₀**: initial angular velocity
- **μ_sp**: spin deceleration coefficient

Note that the x and y components are both zero (as discussed). For the z-coordinate, the equation states that the angular velocity of the ball decreases linearly over time. These equations are valid until the ball stops spinning — that is, when **ω_z(t) = 0**, which occurs at:

$$t_{stop} = \frac{R\, \omega_{z0}}{\mu_{sp}\, g}$$

---

## Rolling Without Slipping

In this state, the linear motion is perfectly coordinated with the rotational motion, expressed physically as:

$$\mathbf{v} = R\, \boldsymbol{\omega} \times \hat{\mathbf{z}}$$

The equation of linear motion is:

$$\mathbf{v}(t) = \mathbf{v}_0 - \mu_r\, g\, \hat{\mathbf{v}}_0\, t$$

$$\mathbf{r}(t) = \mathbf{r}_0 + \mathbf{v}_0\, t - \frac{1}{2}\, \mu_r\, g\, \hat{\mathbf{v}}_0\, t^2$$

Where:
- **μ_r**: rolling (without-slip) friction coefficient
- **v̂₀**: unit vector in the direction of **v₀**

For the rotational motion: rolling without slipping means the **relative velocity** between the ball and the table surface at the contact point is zero. That is:

$$\mathbf{v}_{rel} = \mathbf{v} + \boldsymbol{\omega} \times R\hat{\mathbf{n}} = \mathbf{0}$$

Expanding the cross product:

$$\boldsymbol{\omega} \times R\hat{\mathbf{n}} = R\,(-\omega_y,\; \omega_x,\; 0)$$

This gives three results:

1. For the right-hand side to point in the x-direction (required for rolling without slipping), the angular velocity component **ω_x** must be zero. Thus there is no rotation in the direction of motion.

2. From the constraint equation **v = -R(ω × n̂)**, we can determine **ω_y** (since **v₀** is already known), giving:

$$\boldsymbol{\omega}(t) = \left(0,\; \frac{v(t)}{R},\; \omega_z\right)$$

   Note that **ω_y** is always positive, meaning the rotation must be topspin, not backspin.

3. The absence of **ω_z** from the equation means it has no effect on rolling-without-slip motion at all. Its value can be taken from the spinning state studied earlier, since rotation about the z-axis does not affect the rolling-without-slip state.

The component equations with respect to the **table coordinate system** are given using the rotation matrix:

$$\boldsymbol{\omega}_{table} = R^{-1}(\theta)\,\boldsymbol{\omega}_{ball}$$

$$\begin{pmatrix} \omega_x \\ \omega_y \\ \omega_z \end{pmatrix}_{table}
= \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}
\begin{pmatrix} 0 \\ v/R \\ \omega_z \end{pmatrix}_{ball}$$

With the same z-axis constraint as in the ball coordinate system.

---

## Rolling With Slipping

Slipping occurs when the **relative velocity** between the ball and the table surface at the contact point is **non-zero**. This is the most complex case because it causes a deflection in the ball's path due to friction.

The friction forces come from both linear motion and rotational motion, producing a resultant force that deflects the ball's path. This resultant is opposite in direction to the relative velocity and acts in that same plane.

The relative velocity at the contact point is:

$$\mathbf{v}_{rel} = \mathbf{v} + \boldsymbol{\omega} \times R\hat{\mathbf{n}}$$

The friction force vector for rolling with slipping:

$$\mathbf{F}_{friction} = -\mu_s\, m\, g\, \hat{\mathbf{v}}_{rel}$$

The equations of motion in the **ball coordinate system** are:

$$\dot{\mathbf{v}} = -\mu_s\, g\, \hat{\mathbf{v}}_{rel}$$

$$\dot{\boldsymbol{\omega}} = \frac{5\,\mu_s\, g}{2\,R}\,(\hat{\mathbf{n}} \times \hat{\mathbf{v}}_{rel})$$

The equations in the **table coordinate system** are obtained by the same rotation matrix as above.

With the same z-axis constraint as in the ball-coordinate rolling-with-slip case.

---

# **4. Ball–Ball Collision**

We now study ball-to-ball collisions with the following simplifying assumptions:

1. The collision is elastic (no energy loss).
2. The collision is instantaneous.
3. Friction between the balls during collision is neglected.

These assumptions, while not perfectly accurate, give results that closely approximate reality because these effects are weak in most cases.

We study two sub-cases:
1. One ball is stationary, the other is moving.
2. Both balls are moving.

> **Notation:** The symbol **t₀** denotes the instant of collision; **t₀⁺** denotes the time immediately after. Since the collision is instantaneous, position and angle do not change.

---

## Case 1: One Ball at Rest

Ball **A** is moving and strikes stationary ball **B**.

Using conservation of momentum and conservation of energy (elastic collision):

$$m\,\mathbf{v}_A = m\,\mathbf{v}_A^+ + m\,\mathbf{v}_B^+$$

$$\frac{1}{2}m\,v_A^2 = \frac{1}{2}m\,(v_A^+)^2 + \frac{1}{2}m\,(v_B^+)^2$$

Using trigonometry (with the contact-point normal defining the collision angle **φ**):

$$\mathbf{v}_B^+ = v_A\,\cos\phi\;\hat{\mathbf{n}}$$

$$\mathbf{v}_A^+ = v_A\,\sin\phi\;\hat{\mathbf{t}}$$

$$\boldsymbol{\omega}_A^+ = \boldsymbol{\omega}_A,\quad \boldsymbol{\omega}_B^+ = \mathbf{0}$$

Where **t₀⁺** refers to time immediately after the collision.

---

## Case 2: Both Balls Moving

We change the reference frame so that ball **B** is at rest. In this frame the effective incoming velocity of ball **A** is:

$$\mathbf{v}'_A = \mathbf{v}_A - \mathbf{v}_B$$

Then apply the Case 1 equations with **v'_A** as the incident velocity, giving:

$$\mathbf{v}_B^{+} = \mathbf{v}_B + (v'_A\,\cos\phi)\;\hat{\mathbf{n}}$$

$$\mathbf{v}_A^{+} = \mathbf{v}_A - (v'_A\,\cos\phi)\;\hat{\mathbf{n}}$$

---

# **5. Ball–Cushion Collision**

This is the most complex section because many factors come into play: friction, cushion height, shape, softness, the angle at which the ball strikes the cushion, spin, and linear velocity.

The model used here is the **Han (2005) Model**, which adopts the following simplifications:

- The collision is instantaneous.
- Deformation of the cushion is neglected.

Let **h** denote the height of the cushion contact point above the table surface, and **θ** the inclination angle of the cushion. The contact height is:

$$h = R(1 + \sin\theta)$$

The direction of the impulse from the cushion on the ball is determined by **θ**.

The equations of motion in the **ball coordinate system** for a cushion collision are:

**Linear velocity update:**

$$v_x^+ = -e_{bc}\,v_x$$

$$v_y^+ = v_y - \frac{5}{7}\,\mu_b\,(1 + e_{bc})\,v_x\,\cos\theta\,\sin\theta$$

$$v_z^+ = 0$$

**Angular velocity update:**

$$\omega_x^+ = \omega_x + \frac{5}{2R}\,\mu_b\,(1+e_{bc})\,v_x\,\cos\theta\,\cos\phi_c$$

$$\omega_y^+ = \omega_y$$

$$\omega_z^+ = \omega_z + \frac{5}{2R}\,\mu_b\,(1+e_{bc})\,v_x\,\cos\theta\,\sin\phi_c$$

With the same z-axis constraint as the ball-coordinate rolling-with-slip case.

The table-coordinate equations are obtained using the rotation matrix as before.

---

# **6. Cue–Ball Collision**

When the cue strikes the ball at a position **(a, b)** relative to the ball center, the impulse transfer and resulting velocities are governed by the following relations.

**Normal impulse** (along the cue axis direction **û_c**):

$$J_n = \frac{(1 + e_{tip})\,m\,v_{cue}\,\cos\alpha}
         {1 + \dfrac{m}{M_{cue}} + \dfrac{5}{2}\left(\dfrac{a^2 + b^2}{R^2}\right)}$$

**Linear velocity just after impact:**

$$\mathbf{v}_0 = \frac{J_n}{m}\,\hat{\mathbf{u}}_c$$

**Angular velocity just after impact:**

$$\boldsymbol{\omega}_0 = \frac{5\,J_n}{2\,m\,R^2}\,(\mathbf{r}_{contact} \times \hat{\mathbf{u}}_c)$$

In component form (with the cue in the xz-plane, contact offset **(a, b)**):

$$v_{0x} = \frac{J_n}{m}\,\cos\alpha$$

$$v_{0y} = 0,\quad v_{0z} = -\frac{J_n}{m}\,\sin\alpha$$

$$\omega_{0x} = -\frac{5\,J_n\,b}{2\,m\,R^2}$$

$$\omega_{0y} = \frac{5\,J_n\,(a\,\sin\alpha + R\cos\alpha - R\sqrt{1 - a^2/R^2})}{2\,m\,R^2}$$

$$\omega_{0z} = \frac{5\,J_n\,b\,\cos\alpha}{2\,m\,R^2}$$

---

# **7. Maximizing Sidespin (SRF)**

To achieve maximum sidespin on the stroke, one must maximize the **Spin-to-Roll Factor (SRF)**:

$$\text{SRF} = \frac{|\omega_z|}{|\boldsymbol{\omega}_{yz}|}$$

After applying the boundary conditions on *x* and *y*, the optimal cue contact point is:

$$a_{opt} = 0,\quad b_{opt} = \sqrt{R^2 - c^2}$$

where **c** is the elevation of the contact point. This point lies at angle **φ = arctan(b/R)** below the x-axis relative to the ball center.

---

# **8. References**

\[1\] Alciatore, D. G. *Pool and Billiards Physics — Technical Proof TP B-17: Maximum Drag-Enhanced Sidespin Tip Contact Point.* drdavepoolinfo.com, 2015–2019.

\[2\] Alciatore, D. G. *Pool and Billiards Physics — Technical Proof TP B-6: Cue-Ball Spin and Speed After Impact.* drdavepoolinfo.com, 2015–2019.

\[3\] Alciatore, D. G. *Pool Physics Property Constants (Physical Properties FAQ).* drdavepoolinfo.com/faq/physics/physical-properties/, 2023.

\[4\] Han, I. *Dynamics in carom and three cushion billiards.* KSME International Journal, Springer, 2005.

\[5\] Kiefl, E. *The physics of pool/billiards.* ekiefl.github.io/2020/04/24/pooltool-theory/, April 2020.
