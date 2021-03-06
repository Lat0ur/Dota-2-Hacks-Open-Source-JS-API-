/*!
 * Created on Sun Mar 04 2018
 *
 * This file is part of Corona.
 * Copyright (c) 2018 Corona
 *
 * Corona is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Corona is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Corona.  If not, see <http://www.gnu.org/licenses/>.
 */

function Norotate() {
	if(!Corona.Commands.NoRotating) {
		Corona.Commands.NoRotating = (name, abilName) => {
			var MyEnt = EntityManager.MyEnt

			if(MyEnt.IsMoving) {
				Orders.EntStop(MyEnt, false)
				$.Schedule(Corona.MyTick * 3, () => Corona.Commands.NoRotating(name, abilName))
				return
			}

			var myVec = MyEnt.AbsOrigin,
			hook = MyEnt.AbilityByName("pudge_meat_hook"),
				abil = MyEnt.AbilityByName(abilName),
				dist = hook.CastRange,
				point = Utils.CursorWorldVec

			if(myVec.PointDistance(point) > dist)
				return

			Orders.CastPosition(MyEnt, abil, myVec.VectorRotation(Utils.Angle2Vector(myVec.AngleBetweenTwoVectors(point)), -1), false)
		}
		Game.AddCommand("__NoRotating", Corona.Commands.NoRotating, "", 0)
	}
}

module = {
	name: "No Ratating",
	isVisible: false,
	onPreload: Norotate
}
