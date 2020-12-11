(function() {
  "use strict";

  const all = {
    day1: {
      part1: data => {
        let list = data.trim().split('\n').map(Number);
        let product = 0;
        const end = 2020;
        const l = list.length;
        
        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            if (i !== j) {
              if (list[i] + list[j] === end) {
                product = list[i] * list[j];
                break;
              }
            }
          }
        }
        
        return product;
      },
      part2: data => {
        let list = data.trim().split('\n').map(Number);
        let product = 0;
        const end = 2020;
        const l = list.length;
        
        for (let i = 0; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            for (let k = j + 1; k < l; k++) {
              if (i !== j !== k) {
                if (list[i] + list[j] + list[k] === end) {
                  product = list[i] * list[j] * list[k];
                  break;
                }
              }
            }
          }
        }
        
        return product;
      }
    },
    day2: {
      part1: data => {
        let list = data.trim().split('\n');
        //1-3 a: abcde
        const rx = /(\d+)-(\d+)\s(\w):\s(\w+)/;
        let input = list.map(p => {
          let parts = p.match(rx);
          return {
            low: +parts[1],
            hi: +parts[2],
            cx: RegExp(parts[3], 'g'),
            pass: parts[4]
          };
        });
        const l = input.length;
        let valid = 0;
        
        for(let i = 0; i < l; i++) {
          let item = input[i];
          let m = item.pass.match(item.cx) || [];
          let matches = m.length;
          //console.log(item, m, matches);
          if (matches >= item.low && matches <= item.hi) {
            valid++;
          }
        }
        
        return valid;
      },
      part2: data => {
        let list = data.trim().split('\n');
        //1-3 a: abcde
        const rx = /(\d+)-(\d+)\s(\w):\s(\w+)/;
        let input = list.map(p => {
          let parts = p.match(rx);
          return {
            low: +parts[1] - 1,
            hi: +parts[2] - 1,
            char: parts[3],
            pass: parts[4]
          };
        });
        const l = input.length;
        let valid = 0;
        
        for(let i = 0; i < l; i++) {
          let item = input[i];
          let test = 0;
          if (item.pass[item.low] === item.char) {
            test++;
          }
          if (item.pass[item.hi] === item.char) {
            test++;
          }
          if (test === 1) {
            valid++;
          }
        }
        
        // not 709
        return valid;
      }
    },
    day3: {
      part1: data => {
        let forest = data.trim().split('\n').map(r => r.split(''));
        const l = forest.length;
        const X = '#';
        let x = 0;
        const dy = 1;
        const dx = 3;
        let counts = 0;
        
        for (let y = 0 + dy; y < l; y += dy) {
          let f = forest[y];
          let max = f.length;
          x = (x + dx) % max;
          //console.log(l, i, left, f[left]);
          if (f[x] === X) {
            counts++;
          }
        }
        
        // not 69
        return counts;
      },
      part2: data => {
        let forest = data.trim().split('\n').map(r => r.split(''));
        const l = forest.length;
        const X = '#';
        
        const d = [ // x, y
          [ 1, 1 ],
          [ 3, 1 ],
          [ 5, 1 ],
          [ 7, 1 ],
          [ 1, 2 ]
        ];
        const ll = d.length;
        let trees = [ 0, 0, 0, 0, 0 ];
        
        for (let j = 0; j < ll; j++) {
          let dx = d[j][0];
          let dy = d[j][1];
          let x = 0;
          
          for (let y = 0 + dy; y < l; y += dy) {
            let f = forest[y];
            let maxx = f.length;
            
            x = (x + dx) % maxx;
            
            //console.log(j, x, maxx, y, l, f[x]);
            
            if (f[x] === X) {
              trees[j]++;
            }
          }
        }
        
        //console.log(trees);
        // not 4068413440
        return trees.reduce((acc, item) => { return acc * item; }, 1);
      }
    },
    day4: {
      part1: data => {
        const passports = data
          .trim()
          .split("\n\n")
          .map(p => p.split(/\s+/).map(a => a.split(":")[0]));
        const required = [
          "byr",
          "iyr",
          "eyr",
          "hgt",
          "hcl", 
          "ecl",
          "pid" //,
          //"cid"
        ];
        const rl = required.length;
        
        let valid = 0;
        const l = passports.length;
        
        for(let i = 0; i < l; i++) {
          let pkeys = passports[i];
          let pvalid = true;
          for(let r = 0; r < rl; r++) {
            pvalid = pvalid && pkeys.includes(required[r]);
          }
          
          if (pvalid) {
            valid++;
          }
        }
        
        return valid;
      },
      part2: data => {
        const passports = data
          .trim()
          .split("\n\n")
          .map(p => {
            return { 
                      keys: p.split(/\s+/).map(a => a.split(":")[0]),
                      vals: p.split(/\s+/).map(a => a.split(":")[1]) 
                    };
          });
        const requiredKeys = [
          "byr",
          "iyr",
          "eyr",
          "hgt",
          "hcl", 
          "ecl",
          "pid" //,
          //"cid"
        ];
        const rl = requiredKeys.length;

        const isN = v => /^\d+$/.test(v);
        const rxL = /^(\d+)(in|cm)$/;
        const isL = v => {
          let m = v.match(rxL);
          
          if (m) {
            let l = +m[1];
            if (m[2] === "in") {
              return l >= 59 && l <= 76;
            } else { // cm
              return l >= 150 && l <= 193;
            }
          } else {
            return false;
          }
        };
        const eyes = "amb blu brn gry grn hzl oth".split(" ");
        const requiredVals = {
          "byr": v => { return (isN && +v >= 1920 && +v <= 2002); },
          "iyr": v => { return (isN && +v >= 2010 && +v <= 2020); },
          "eyr": v => { return (isN && +v >= 2020 && +v <= 2030); },
          "hgt": v => { return isL(v); },
          "hcl": v => { return /^\#[0-9a-f]{6}$/.test(v); }, 
          "ecl": v => { return eyes.includes(v); },
          "pid": v => { return /^\d{9}$/.test(v); },
          "cid": v => { return true; }
        };
        
        let valid = 0;
        const l = passports.length;
        
        for(let i = 0; i < l; i++) {
          let pass = passports[i];
          let pvalid = true;
          for(let r = 0; r < rl; r++) {
            pvalid = pvalid && pass.keys.includes(requiredKeys[r]);
          }
          
          if (pvalid) {
            for (let vi = 0, vl = pass.vals.length; vi < vl; vi++) {
              const key = pass.keys[vi];
              const val = pass.vals[vi];
              pvalid = pvalid && requiredVals[key](val);
              //console.log(key, val, requiredVals[key](val));
            }
            if (pvalid) {
              valid++;
            }
          }
        }
        
        return valid;
      }
    },
    day5: {
      part1: data => {
        let seats = data.trim().split('\n').map(n => { 
          return { 
            input: n,
            row: n.substr(0,7).split(""),
            seat: n.substr(7).split("")
          }; 
        });
        const values = {
          F: 0,
          B: 1,
          L: 0,
          R: 1
        };
        const ROWS = 128;
        const SEATS = 8;
        let max = 0;
        
        let seatNums = seats.map(s => {
          let rowID = 0;
          //let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]];
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          //let si = 0;
          let c = SEATS;
          let cvs = [];
          for (let i = 0, l = s.seat.length; i < l; i++) {
            c = c / 2;
            let cv = c * values[s.seat[i]];
            seatID += cv;
            cvs.push(cv);
          }
          
          let val = rowID * 8 + seatID;
          max = Math.max(max, val);
          
          return {
            input: s.input,
            row: s.row,
            seat: s.seat,
            rowID: rowID,
            seatID: seatID,
            result: val,
            rvs: rvs,
            cvs: cvs
          };
        });
        console.log(seatNums);
        
        return max;
      },
      part2: data => {
        let seats = data.trim().split('\n').map(n => { 
          return { 
            input: n,
            row: n.substr(0,7).split(""),
            seat: n.substr(7).split("")
          }; 
        });
        const values = {
          F: 0,
          B: 1,
          L: 0,
          R: 1
        };
        const ROWS = 128;
        const SEATS = 8;
        const all = [];
        for (let i = 1000; i--;) {
          all[i] = 0;
        }
        let min = Infinity;
        
        let seatNums = seats.map(s => {
          let rowID = 0;
          //let ri = 0;
          let r = ROWS;
          let rvs = [];
          for (let i = 0, l = s.row.length; i < l; i++) {
            r = r / 2;
            let rv = r * values[s.row[i]];
            rowID += rv;
            rvs.push(rv);
          }
          
          let seatID = 0;
          //let si = 0;
          let c = SEATS;
          let cvs = [];
          for (let i = 0, l = s.seat.length; i < l; i++) {
            c = c / 2;
            let cv = c * values[s.seat[i]];
            seatID += cv;
            cvs.push(cv);
          }
          
          let val = rowID * 8 + seatID;
          all[val]++;
          min = Math.min(min, val);
          
          return {
            input: s.input,
            row: s.row,
            seat: s.seat,
            rowID: rowID,
            seatID: seatID,
            result: val
          };
        }).sort((a, b) => {
          return a.result - b.result;
        });
        console.log(seatNums);
        //console.log(all);
        
        return all.indexOf(0, min);
      }
    },
    day6: {
      part1: data => {
        const answers = data
          .trim()
          .split("\n\n")
          .map(a => {
            let group = a.replace(/\n/g, "")
                      .split("");
            let uniqueItems = [...new Set(group)];
            //console.log(uniqueItems);
            return uniqueItems;
        });
        
        const result = answers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.length;
        }, 0);
        
        return result;
      },
      part2: data => {
        const answers = data
          .trim()
          .split("\n\n")
          .map(a => {
            let group = a.split("\n");
            return {
              g: group,
              gl: group.length,
              s: group.join(""),
              ss: group.join("").split(""),
              u: [...new Set(group.join(""))]
            };
        });
        
        const result = answers.reduce((acc, group) => {
          //console.log(group);
          const count = group.u.reduce((uacc, uans) => {
            //console.log(uans + " filter len: " + group.ss.filter(s => s === uans).length, group.ss.filter(s => s === uans));
            return uacc + ((group.ss.filter(s => s === uans).length === group.gl) ? 1 : 0);
          }, 0);
          //console.log("count: " + count);
          return acc + count;
        }, 0);
        
        return result;
      }
    },
    day7: {
      part1: data => {
        const input = data.trim().split("\n");
        const rx = /([a-z\s]+)\sbags\scontain\s(.+)\./;
        //          1 parent                   2 children
        const rxsub = /(?:(\d+)\s([a-z\s]+)\sbags?)/;  //|(no\sother\sbags)/
        //                1 num  2 name                   3 none
        
        let rules = input.reduce((obj, item) => {
          let parent = item.match(rx);
          const bag = parent[1];
          //console.log(parent[2]);
          let children = parent[2].split(',').filter(c => c !== "no other bags").map(c => {
            let m = c.trim().match(rxsub);
            let child = {
              "name": m[2],
              "count": +m[1]
            };
            return child;
          });
          
          obj[bag] = {
            //"hasGold": false,
            "contains": children
          };
          
          return obj;
        }, {});
        const bagNames = Object.keys(rules);
        
        // find where any child is "shiny gold"
        const findGold = (bagName, hasGold) => {
          if (bagName === "shiny gold") {
            return true;
          } else {
            // if not gold, check children
            let bag = rules[bagName]; 
            if (bag.hasGold) {
              // this bag was already searched
              return true;
            } else if (bag.contains && bag.contains.length) {
              for (let i = 0, l = bag.contains.length; i < l; i++) {
                hasGold = hasGold || findGold(bag.contains[i].name);
                if (hasGold) {
                  // stop at first gold
                  bag.hasGold = true;
                  return true;
                }
              }
            }
          }
          
          return hasGold;
        };
        
        let bagsWithGold = [];  
        for(let i = 0, l = bagNames.length; i < l; i++) {
          if (bagNames[i] !== "shiny gold") {
            let thisBagHasGold = findGold(bagNames[i], false);
            if (thisBagHasGold) {
              bagsWithGold.push(bagNames[i]);
            }
          }
        }

        //console.log(rules);
        //console.log(bagsWithGold);

        return bagsWithGold.length;
      },
      part2: data => {
        const input = data.trim().split("\n");
        const rx = /([a-z\s]+)\sbags\scontain\s(.+)\./;
        //          1 parent                   2 children
        const rxsub = /(?:(\d+)\s([a-z\s]+)\sbags?)/;  //|(no\sother\sbags)/
        //                1 num  2 name                   3 none
        
        let rules = input.reduce((obj, item) => {
          let parent = item.match(rx);
          const bag = parent[1];
          //console.log(parent[2]);
          let children = parent[2].split(',').filter(c => c !== "no other bags").map(c => {
            let m = c.trim().match(rxsub);
            let child = {
              "name": m[2],
              "count": +m[1]
            };
            return child;
          });
          
          obj[bag] = {
            //"hasGold": false,
            "contains": children
          };
          
          return obj;
        }, {});
        //const bagNames = Object.keys(rules);
        
        // find where any child is "shiny gold" and multiply
        const findChildCount = (bagName) => {
          const bag = rules[bagName];
          let childCount = 0;
          
          if (bag.contains && bag.contains.length) {
            for (let i = 0, l = bag.contains.length; i < l; i++) {
              let child = bag.contains[i];
              // count children themselves
              childCount += child.count;
              // count grandchildren
              let gc = findChildCount(child.name);
              childCount += (child.count * gc);
            }
          }
          
          return childCount;
        };
        
        let goldCount = findChildCount("shiny gold");

        return goldCount;
      }
    },
    day8: {
      part1: data => {
        const rx = /(acc|jmp|nop)\s(\+|\-)(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let command = m.match(rx);
          let chg = +command[3];
          return {
            cmd: command[1],
            value: (command[2] === '+') ? chg : 0 - chg,
            history: 0
          };
        });
        
        let acc = 0;
        let safety = 1000;
        let pos = 0;
        let output = null;
        
        while(safety--) {
          let cmd = input[pos];
          //console.log(cmd);
          if (cmd.history === 1) {
            output = acc;
            break;
          }
          cmd.history++;
          if (cmd.cmd === "acc") {
            acc += cmd.value;
            pos++;
          } else if (cmd.cmd === "jmp") {
            pos += cmd.value;
          } else if (cmd.cmd === "nop") {
            pos++;
          }
        }
        
        if (safety <= 0) {
          console.warn("SAFETY hit.");
        }
        
        return output;
      },
      part2: data => {
        const rx = /(acc|jmp|nop)\s(\+|\-)(\d+)/;
        const input = data.trim().split("\n").map(m => {
          let command = m.match(rx);
          let chg = +command[3];
          return {
            cmd: command[1],
            value: (command[2] === '+') ? chg : 0 - chg,
            history: 0
          };
        });
        const il = input.length;
        console.log("input length: " + il);
        
        let output = null;
        const errCmds = ["jmp", "nop"];
        for (let i = 0, l = errCmds.length; i < l; i++) {
          let cmdSafety = 1000;
          const badCmd = errCmds[i];
          let lastIndex = -1;
          
          const last = lastIndex;
          let indexOf = input.findIndex((m, idx) => idx > last && m.cmd === badCmd);
          while (indexOf > -1 && indexOf < il && cmdSafety--) {
            let clonedInputs = JSON.parse(JSON.stringify(input));
            let acc = 0;
            let safety = 1000;
            let pos = 0;
            output = null;
            let isInfinite = false;

            while(safety-- && !isInfinite) {
              let cmd = clonedInputs[pos];
              if (pos === indexOf) {
                if (cmd.cmd === "jmp") {
                  cmd.cmd = "nop";
                } else if (cmd.cmd === "nop") {
                  cmd.cmd = "jmp";
                }
              }
              if (cmd.history === 1) {
                // infinite
                isInfinite = true;
              }
              cmd.history++;
              
              if (cmd.cmd === "acc") {
                acc += cmd.value;
                pos++;
              } else if (cmd.cmd === "jmp") {
                pos += cmd.value;
              } else if (cmd.cmd === "nop") {
                pos++;
              }
              if (pos === il) {
                // end!
                output = acc;
                return output;
              }
            }
            
            lastIndex = indexOf;
            const last2 = lastIndex;
            indexOf = input.findIndex((m, idx) => idx > last2 && m.cmd === badCmd);
            if (safety <= 0) {
              console.warn("SAFETY hit.");
            }
          }
          if (cmdSafety <= 0) {
            console.warn("cmdSAFETY hit.");
          }
        }    
        
        return output;
      }
    },
    day9: {
      part1: data => {
        const input = data.trim().split("\n").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const min = 25;
        
        for (let i = min; i < l; i++) {
          const dig = input[i];
          let isValid = false;
          
          for (let j = i - min; j < i; j++) {
            const mult1 = input[j];
            for (let k = j + 1; k < i; k++) {
              const mult2 = input[k];
              
              if (mult1 + mult2 === dig) {
                isValid = true;
                k = i + 1;
                j = i + 1;
              }
            }
          }
          
          if (!isValid) {
            return dig;
          }
        }
        
        // not 5
        return null;
      },
      part2: data => {
        const input = data.trim().split("\n").map(Number);
        const l = input.length;
        console.log("input length: " + l);
        const min = 25;
        
        let found = null;
        for (let i = min; i < l; i++) {
          const dig = input[i];
          let isValid = false;
          
          for (let j = i - min; j < i; j++) {
            const mult1 = input[j];
            for (let k = j + 1; k < i; k++) {
              const mult2 = input[k];
              
              if (mult1 + mult2 === dig) {
                isValid = true;
                k = i + 1;
                j = i + 1;
              }
            }
          }
          
          if (!isValid) {
            found = dig;
          }
        }
        
        for (let i = 0; i < l; i++) {
          let sum = input[i];
          let safety = 1000;
          let smallest = input[i];
          let largest = input[i];
          
          let searchIndex = i + 1;
          while (safety-- && sum < found && searchIndex < l) {
            smallest = Math.min(smallest, input[searchIndex]);
            largest = Math.max(largest, input[searchIndex]);
            sum += input[searchIndex];
            if (sum === found) {
              return smallest + largest;
            }
            searchIndex++;
          }

          if (safety <= 0) {
            console.warn("SAFETY hit.");
          }
        }

        return null;
      }
    },
    day10: {
      part1: data => {
        const input = data.trim().split("\n").map(Number).sort((a, b) => a - b);
        const l = input.length;
        console.log("input length: " + l);
        
        let counts = {
          "1": 0,
          "2": 0,
          "3": 0
        };
        //let joltage = 0;
        
        for (let i = 0; i < l; i++) {
          let prev = i > 0 ? input[i - 1] : 0;
          counts["" + (input[i] - prev)]++;
        }
        counts["3"]++;
        console.log(counts);
        
        // not 1608
        // not 1632
        return counts["1"] * counts["3"];
      },
      part2: data => {
        const input = data.trim().split("\n").map(Number).sort((a, b) => a - b);
        const min = 0;
        //const max = Math.max( ...input ) + 3;
        input.unshift(min);
        //input.push(max);
        const l = input.length;
        console.log("input length: " + l);
        
        let count = 1;
        let count2 = 0;
        
        console.log(input);

        for (let i = 0; i < l - 1; i++) {
          let variations = 0;
          for (let c = 1; c <= 3; c++) {
            let next = input[i] + c;
            console.log(next, c, i);
            if (input.includes(next)) {
              variations++;
            }
          }
          console.log(variations);
          count = variations * count;
          count2 += variations - 1;
        }
        console.log(count, count2);
        
        // broken
        return count2;
      }
    },
    day11: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day12: {
      part1: data => {
        return data;
      },
      part2: data => {
        return data;
      }
    },
    day13: {
      part1: data => {
        return data;
      },
      part2: data => {}
    },
    day14: {
      part1: data => {  
      },
      part2: data => {
        
      }
    },
    day15: { 
      part1: data => {
      },
      part2: data => {}
    },
    day16: {
      part1: data => {},
      part2: data => {}
    },
    day17: {
      part1: data => {},
      part2: data => {}
    },
    day18: {
      part1: data => {},
      part2: data => {}
    },
    day19: {
      part1: data => {},
      part2: data => {}
    },
    day20: {
      part1: data => {},
      part2: data => {}
    },
    day21: {
      part1: data => {},
      part2: data => {}
    },
    day22: {
      part1: data => {},
      part2: data => {}
    },
    day23: {
      part1: data => {},
      part2: data => {}
    },
    day24: {
      part1: data => {},
      part2: data => {}
    },
    day25: {
      part1: data => {},
      part2: data => {}
    }
  };

  const funs = function(day, part) {
    return all["day" + day]["part" + part];
  };

  this.funs = funs;
}.call(this));
