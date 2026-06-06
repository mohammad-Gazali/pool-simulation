# Physics of Billiards: A Comprehensive Reference Model

## 1. Introduction
The game of billiards has been studied for over 200 years. A major contribution to this field stems from Newton's research, which focused on the physical motion of objects, particularly collisions. This formed the foundation for dedicated studies on billiard dynamics. To understand the motion of a billiard ball, we must recognize four primary aspects of its movement:
1. The motion of the ball on the table surface (involving friction, spin, and rolling).
2. The motion of the ball upon collision with another ball.
3. The motion of the ball upon collision with the table cushions.
4. The motion of the ball when struck by a cue stick.

**Assumptions and Specifications for this Model:**
* Air resistance during ball motion is neglected.
* All balls are identical in size and weight, conforming to standard specifications used in all billiard tables.
* The billiard table is perfectly level and parallel to the horizon; thus, gravity only acts perpendicular to the surface, and its reactive normal force cancels it out (no gravitational acceleration along the XY plane).
* Standard constants for friction and restitution are adopted, as they are common in most billiard setups (detailed in Section 2).
* Table cushions are not perfectly rigid; they are slightly soft and angled sharply (to be discussed in the cushion collision section).
* A standard cue stick is assumed, with its related constants detailed below.

## 2. Physical Properties of Game Components

### Billiard Ball Properties
* **Diameter:** 2.25 inches (57.15 mm) $\rightarrow$ Radius $R \approx 0.028575$ m
* **Mass ($m$):** 170 grams (0.170 kg)
* **Moment of Inertia ($I$):** $I = \frac{2}{5} m R^2$ (Solid sphere approximation)

### Friction and Restitution Coefficients
* **Ball-to-Ball Friction Coefficient:** $0.03 - 0.08$
* **Ball-to-Ball Coefficient of Restitution (COR):** $0.92 - 0.98$
* **Rolling Friction Coefficient (Ball-to-Surface):** $\mu_r = 0.005 - 0.015$
* **Sliding Friction Coefficient (Ball-to-Surface):** $\mu_s = 0.15 - 0.4$ (Typical value: $0.2$)
* **Ball-to-Cushion COR:** $e_c = 0.6 - 0.9$
* **Cue Tip-to-Ball Friction Coefficient:** $\mu_{cue} = 0.6$
* **Cue Tip-to-Ball COR (Leather tip):** $e_{cue} = 0.71 - 0.75$

### Other Constants
* **Rotational Deceleration Rate (Spin decay):** $5 - 15$ rad/s² (phenomenological)
* **Ball-to-Surface COR (Vertical bounce):** $0.5 - 0.7$

---

## 3. Ball-Surface Motion Dynamics
A ball interacting with the table surface exists in one of four states:
1. **Rest:** No motion.
2. **Pure Rotation (Spinning in place):** Rotating around its vertical axis without linear translation.
3. **Rolling without Slipping:** Perfect harmonic synchronization of linear and angular motion.
4. **Rolling with Slipping:** Complex state causing trajectory deviation (swerve/throw).

### 3.1 State of Rest
The ball is completely stationary. The primary component equations are:
$$ \vec{r}(t) = \vec{r}_0 $$
$$ \vec{v}(t) = \vec{0} $$
$$ \vec{\omega}(t) = \vec{0} $$
*Where $\vec{r}$ is the position vector, $\vec{v}$ is the linear velocity vector, and $\vec{\omega}$ is the angular velocity vector.*

### 3.2 State of Pure Rotation
Rotation occurs strictly around the $z$-axis (vertical). If rotation occurred around $x$ or $y$, it would generate friction with the surface, converting into linear velocity, which is excluded from this specific state. 
*Note on modeling:* A single point of contact theoretically generates no friction torque. However, in reality, the contact area is a small surface, not a point. To avoid overcomplicating the mathematical model, a **phenomenological rotational friction coefficient** ($\mu_{spin}$) is introduced to slow the spin to a halt. *(Author's note: This is a "fudge factor" temporarily added to the model to explain an observation that the base assumptions don't fully capture. It is a common scientific simplification).*

The equations for this state are:
$$ \omega_z(t) = \omega_{z0} - \left( \frac{5 \mu_{spin} g}{2 R} \right) t $$
$$ v_x(t) = 0, \quad v_y(t) = 0 $$
*Constraint:* These equations are valid until the ball stops spinning, which occurs when $\omega_z(t) = 0$, at time $t_{stop} = \frac{2 R \omega_{z0}}{5 \mu_{spin} g}$.

### 3.3 Rolling Without Slipping
In this state, linear motion is perfectly synchronized with rotational motion. The relative velocity at the contact point is zero:
$$ \vec{v}_{rel} = \vec{v} + \vec{\omega} \times (R \hat{k}) = \vec{0} \implies \vec{v} = \vec{\omega} \times (R \hat{k}) $$

**Linear Motion Equations:**
$$ \vec{v}(t) = \vec{v}_0 - \mu_r g t \, \hat{u}_v $$
$$ \vec{r}(t) = \vec{r}_0 + \vec{v}_0 t - \frac{1}{2} \mu_r g t^2 \, \hat{u}_v $$
*Where $\hat{u}_v$ is the unit vector in the direction of $\vec{v}_0$.*

**Angular Motion Constraints:**
From $\vec{v} = \vec{\omega} \times (R \hat{k})$, we derive:
$$ \omega_x = -\frac{v_y}{R}, \quad \omega_y = \frac{v_x}{R}, \quad \omega_z = 0 $$
*(Note: $\omega_z$ does not affect pure forward rolling, but any residual $\omega_z$ from a previous state decays independently as described in 3.2).*

### 3.4 Rolling With Slipping
This is the most complex state. It occurs when the relative velocity at the contact point is non-zero ($\vec{v}_{rel} \neq \vec{0}$). This generates a kinetic friction force that opposes the slip direction, causing the ball's trajectory to curve (swerve).

**Relative Velocity at Contact Point:**
$$ \vec{v}_{rel} = \vec{v} + \vec{\omega} \times (R \hat{k}) $$

**Friction Force:**
$$ \vec{F}_f = -\mu_s m g \frac{\vec{v}_{rel}}{|\vec{v}_{rel}|} $$

**Equations of Motion (Newton-Euler):**
$$ \frac{d\vec{v}}{dt} = -\mu_s g \frac{\vec{v}_{rel}}{|\vec{v}_{rel}|} $$
$$ \frac{d\vec{\omega}}{dt} = \frac{R}{I} (\vec{F}_f \times \hat{k}) = -\frac{5 \mu_s g}{2 R} \left( \frac{\vec{v}_{rel}}{|\vec{v}_{rel}|} \times \hat{k} \right) $$
*The ball remains in this state until $|\vec{v}_{rel}| = 0$, at which point it transitions to "Rolling Without Slipping".*

---

## 4. Ball-to-Ball Collision Dynamics
To keep the model computationally efficient yet highly accurate, we apply the following constraints:
* Collisions are perfectly elastic (no energy loss).
* Collisions are instantaneous (time of impact $\Delta t \to 0$).
* Inter-ball friction during the infinitesimal impact time is neglected.

Let $t_c$ be the moment of collision, and $t_c^+$ be the time immediately after. Let $\hat{n}$ be the unit vector along the line connecting the centers of the two balls at the moment of impact, and $\hat{t}$ be the tangent vector perpendicular to $\hat{n}$.

### 4.1 Case 1: One Moving Ball (A), One Stationary Ball (B)
Based on the conservation of linear momentum and kinetic energy for equal-mass spheres:
$$ \vec{v}_A' = \vec{v}_A - (\vec{v}_A \cdot \hat{n})\hat{n} $$
$$ \vec{v}_B' = (\vec{v}_A \cdot \hat{n})\hat{n} $$
*Note: Because the collision is instantaneous, the positions $\vec{r}_A$ and $\vec{r}_B$, and the angular velocities $\vec{\omega}_A$ and $\vec{\omega}_B$ remain unchanged during the impact.*

### 4.2 Case 2: Both Balls Moving
We solve this by shifting the frame of reference so that Ball B appears stationary. We calculate the relative velocity $\vec{v}_{rel} = \vec{v}_A - \vec{v}_B$, apply the equations from Case 1 to $\vec{v}_{rel}$, and then transform back to the global frame:
$$ \vec{v}_A' = \vec{v}_A - [(\vec{v}_A - \vec{v}_B) \cdot \hat{n}]\hat{n} $$
$$ \vec{v}_B' = \vec{v}_B + [(\vec{v}_A - \vec{v}_B) \cdot \hat{n}]\hat{n} $$

---

## 5. Ball-to-Cushion Collision Dynamics
This is the most complex section due to multiple factors: cushion height, softness, impact angle, linear velocity, and angular velocity. We adopt a simplified rigid-body impulse model (based on Han Model, 2005).

**Assumptions:**
* Collision is instantaneous.
* Cushion deformation is neglected for the impulse calculation, but its effect is captured via the Coefficient of Restitution ($e_c$).

**Geometry:**
Let $h$ be the height of the cushion contact point above the table. The impact angle $\theta$ (between the cushion normal and the ball's velocity vector) dictates the direction of the impulse.

**Impulse-Momentum Equations:**
Let $v_n$ be the normal velocity component (towards the cushion) and $\vec{v}_t$ be the tangential velocity component at the contact point.
1. **Normal Velocity Reversal:**
   $$ v_n' = -e_c v_n $$
2. **Tangential Velocity and Spin Update:**
   The friction impulse $J_t$ depends on whether the contact point sticks or slips.
   *If slipping occurs throughout impact:*
   $$ J_t = \mu_c J_n $$
   *If sticking occurs (friction is sufficient to halt slip before impact ends):*
   $$ J_t = \frac{m v_{t, initial}}{1 + \frac{m R^2}{I}} = \frac{2}{7} m v_{t, initial} $$

**Final Post-Collision State:**
$$ \vec{v}' = \vec{v} + \frac{1}{m} (J_n \hat{n} + J_t \hat{t}) $$
$$ \vec{\omega}' = \vec{\omega} + \frac{R}{I} (J_t \hat{t} \times \hat{k}) $$
*Where $J_n = m(1+e_c)v_n$ is the normal impulse.*

---

## 6. Cue-to-Ball Collision Dynamics
This section models the initial strike of the cue stick on the cue ball. The resulting spin depends on the offset coordinates $(x, y)$ from the center of the ball, where $x$ is the horizontal offset (sidespin) and $y$ is the vertical offset (topspin/backspin).

**Geometric Constraint:**
The strike point must be on the surface of the ball:
$$ x^2 + y^2 \le R^2 $$

**Initial Linear Velocity ($v_0$):**
Based on inelastic collision principles between the cue (effective mass $M_{eff}$) and the ball ($m$):
$$ v_0 = \left( \frac{1 + e_{cue}}{1 + \frac{m}{M_{eff}}} \right) v_{cue} $$

**Initial Angular Velocity ($\vec{\omega}_0$):**
The impulse $J = m v_0$ generates torque. Using $I = \frac{2}{5}mR^2$:
$$ \omega_x = 0 $$
$$ \omega_y = \frac{5}{2} \frac{v_0 y}{R^2} \quad \text{(Topspin/Backspin)} $$
$$ \omega_z = -\frac{5}{2} \frac{v_0 x}{R^2} \quad \text{(Sidespin)} $$

**Transition to Rolling:**
Immediately after the strike, the ball is in a "Rolling with Slipping" state. It will naturally evolve toward "Rolling without Slipping". The final steady-state rolling velocity $v_{roll}$ (ignoring table friction for the transition calculation) is:
$$ v_{roll} = \frac{5}{7} v_0 + \frac{2}{7} \omega_{y0} R $$

**Maximum Sidespin (SRF - Spin Rate Factor):**
To achieve maximum sidespin without miscuing, the optimal strike point is found by maximizing $\omega_z$ subject to the friction limit of the cue tip. This typically occurs at an offset angle below the horizontal axis. The theoretical maximum safe offset is approximately:
$$ x_{max} \approx R \sin(\theta_{miscue}) \approx 0.5R \text{ to } 0.7R $$
*(Where $\theta_{miscue}$ is the maximum angle before the cue tip slips off the ball, dependent on $\mu_{cue}$).*

---

## 7. References
1. Alciatore, D. G. *Pool and Billiards Physics — Technical Proof TP B-17: Maximum Drag-Enhanced Sidespin Tip Contact Point.* drdavepoolinfo.com, 2015–2019.
2. Alciatore, D. G. *Pool and Billiards Physics — Technical Proof TP B-6: Cue-Ball Spin and Speed After Impact.* drdavepoolinfo.com, 2015–2019.
3. Alciatore, D. G. *Pool Physics Property Constants (Physical Properties FAQ).* drdavepoolinfo.com/faq/physics/physical-properties/, 2023.
4. Han, I. *Dynamics in carom and three cushion billiards.* KSME International Journal, Springer, 2005.
5. Kiefl, E. *The physics of pool/billiards.* ekiefl.github.io/2020/04/24/pooltool-theory/, April 2020.

--- 
*End of Document. This formatted version is optimized for ingestion by AI agents, with clear variable definitions and standard LaTeX mathematical representations.*
