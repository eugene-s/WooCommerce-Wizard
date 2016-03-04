function ValidationStep2($_POST) {
    function validation_data() {
        var $data = {};

        $data['sph_left'] = $_POST['sph_left'];
        $data['sph_right'] = $_POST['sph_right'];
        $data['cyl_left'] = $_POST['cyl_left'];
        $data['cyl_right'] = $_POST['cyl_right'];
        $data['axis_left'] = $_POST['axis_left'];
        $data['axis_right'] = $_POST['axis_right'];
        $data['pd'] = $_POST['pd'];
        $data['new_pd'] = $_POST['new_pd'];
        $data['check'] = $_POST['check'];
        $data['pd2'] = $_POST['pd2'];

        // check different polar SPH
        if ($data['sph_left'] <= 0 && $data['sph_right'] <= 0 ||
            $data['sph_left'] >= 0 && $data['sph_right'] >= 0) {
            //if CYL select && AXIS don't select - return err||
            if (String($data['cyl_left']).match(/\d+/) && String($data['axis_left']).match(/\d+/) ||
                String($data['cyl_right']).match(/\d+/) && String($data['axis_right']).match(/\d+/)) {
                return {'valid': false, 'text': 'You must select AXIS'};
            } else {
                if ($data['new_pd'] == 'false') {
                    if ($data['pd'] == 'none') {
                        return {'valid': false, 'text': 'Please, select a Pupillary Distance'};
                    }
                } else {
                    if ($data['pd'] == 'none' && $data['pd2'] == 'none') {
                        return {'valid': false, 'text': 'Please, select a Pupillary Distance'};
                    }
                }
                if ($data['check'] != 'false') {
                    return {'valid': true, 'indexes_lens': validation_recipe($data)};
                }
                else {
                    return {'valid': false, 'text': 'Please, confirm this recipe'};
                }
            }
        } else {
            return {'valid': false, 'text': 'You just pick one of SPH + other  -'};

        }
    }

    /**
     * check  recipe is correct,&& create price on next step
     */
    function validation_recipe($data) {
        var $type = $_POST['type'];

        $data['cyl_left'] = Math.abs($data['cyl_left']);
        $data['cyl_right'] = Math.abs($data['cyl_right']);

        if ($type == 1 || $type == 3) {
            //validation left eyes
            $data['cyl'] = $data['cyl_left'];
            $data['sph'] = $data['sph_left'];
            var $index_left = validation_one_eyes_type_1_3($data);

            //validation right eyes
            $data['cyl'] = $data['cyl_right'];
            $data['sph'] = $data['sph_right'];
            var $index_right = validation_one_eyes_type_1_3($data);

            if ($data['cyl_right'] >= $data['cyl_left']) {
                var $max_index = $index_right;
                var $min_index = $index_left;
            } else {
                $max_index = $index_left;
                $min_index = $index_right;
            }
            var $lens_index = get_full_index_array($max_index, $min_index);

            return $lens_index;
        } else if ($type == 2) {
            //validation left eyes
            $data['cyl'] = $data['cyl_left'];
            $data['sph'] = $data['sph_left'];
            $index_left = validation_one_eyes_type_2($data);

            //validation right eyes
            $data['cyl'] = $data['cyl_right'];
            $data['sph'] = $data['sph_right'];
            $index_right = validation_one_eyes_type_2($data);
            if ($data['cyl_right'] >= $data['cyl_left']) {
                $max_index = $index_right;
                $min_index = $index_left;
            } else {
                $max_index = $index_left;
                $min_index = $index_right;
            }
            $lens_index = get_full_index_array($max_index, $min_index);
            return $lens_index;


        } else {
            alert('Wrong type lens');
        }
    }

    function get_full_index_array($max_array, $min_array) {
        var $min_index_max_array = Math.min.apply(Math, $max_array);
        var $min_index_min_array = Math.min.apply(Math, $min_array);
        var $max_index_max_array = Math.max.apply(Math, $max_array);
        var $max_index_min_array = Math.max.apply(Math, $min_array);

        var $index;

        if ($min_index_max_array < $min_index_min_array) {
            var $result_array = {};
            for ($index in $max_array) {
                if ($max_array.hasOwnProperty($index)) {
                    if ($index >= $min_index_min_array) {
                        $result_array[$index] = $max_array[$index];
                    }
                }
            }
        } else {
            $result_array = $max_array;
        }

        if ($max_index_max_array < $max_index_min_array) {
            for ($index in $min_array) {
                if ($min_array.hasOwnProperty($index)) {
                    if ($max_index_max_array < $index) {
                        $result_array[$index] = $min_array[$index];
                    }
                }
            }
        }

        return $result_array;
    }


//price information about CYL index
    function type_1_3_index_price() {
        var $data;

        if ($_POST['type'] == 1) {
            $data = type_1_index_price();
        } else if ($_POST['type'] == 3) {
            $data = type_3_index_price();
        }

        return $data;
    }

    function type_1_index_price() {
        var $data = {};

        if (!$data[2]) {
            $data[2] = {};
        }

        $data[2]['1.50'] = 2;
        $data[2]['1.56'] = 2;
        $data[2]['1.61'] = 2;
        $data[2]['1.67'] = 2;
        $data[2]['1.74'] = 2;
        $data[2]['1.74M'] = 2;

        if (!$data[3]) {
            $data[3] = {};
        }

        $data[3]['1.50'] = 3;
        $data[3]['1.50M'] = 3;
        $data[3]['1.56'] = 3;
        $data[3]['1.56M'] = 3;
        $data[3]['1.61'] = 3;
        $data[3]['1.61M'] = 3;
        $data[3]['1.67'] = 3;
        $data[3]['1.67M'] = 3;
        $data[3]['1.74'] = 3;
        $data[3]['1.74M'] = 3;

        if (!$data[4]) {
            $data[4] = {};
        }

        $data[4]['1.56'] = 4;
        $data[4]['1.56M'] = 4;
        $data[4]['1.61'] = 4;
        $data[4]['1.61M'] = 4;
        $data[4]['1.67'] = 4;
        $data[4]['1.67M'] = 4;
        $data[4]['1.74'] = 4;
        $data[4]['1.74M'] = 4;

        return $data;
    }

    function type_2_index_price() {
        var $data = {};

        if (!$data[2]) {
            $data[2] = {};
        }

        $data[2]['1.56'] = 2;
        $data[2]['1.56M'] = 2;
        $data[2]['1.60'] = 2;
        $data[2]['1.60M'] = 2;
        $data[2]['1.67M'] = 2;

        if (!$data[3]) {
            $data[3] = {};
        }

        $data[3]['1.56M'] = 3;
        $data[3]['1.60'] = 3;
        $data[3]['1.60M'] = 3;
        $data[3]['1.67M'] = 3;

        if (!$data[4]) {
            $data[4] = {};
        }

        $data[4]['1.56M'] = 4;
        $data[4]['1.60M'] = 4;
        $data[4]['1.67M'] = 4;

        return $data;
    }


    function type_3_index_price() {
        var $data = {};

        if (!$data[2]) {
            $data[2] = {};
        }

        $data[2]['1.50'] = 2;
        $data[2]['1.56'] = 2;
        $data[2]['1.61'] = 2;
        $data[2]['1.67'] = 2;
        $data[2]['1.74'] = 2;
        $data[2]['1.74M'] = 2;

        if (!$data[3]) {
            $data[3] = {};
        }

        $data[3]['1.50'] = 3;
        $data[3]['1.50M'] = 3;
        $data[3]['1.56'] = 3;
        $data[3]['1.56M'] = 3;
        $data[3]['1.61'] = 3;
        $data[3]['1.61M'] = 3;
        $data[3]['1.67'] = 3;
        $data[3]['1.67M'] = 3;
        $data[3]['1.74'] = 3;
        $data[3]['1.74M'] = 3;

        if (!$data[4]) {
            $data[4] = {};
        }

        $data[4]['1.56'] = 4;
        $data[4]['1.56M'] = 4;
        $data[4]['1.61'] = 4;
        $data[4]['1.61M'] = 4;
        $data[4]['1.67'] = 4;
        $data[4]['1.67M'] = 4;
        $data[4]['1.74'] = 4;
        $data[4]['1.74M'] = 4;

        return $data;
    }

    function validation_one_eyes_type_1_3($data) {
        var $index_valid;
        if ($data['cyl'] <= 2) {
            $index_valid = type_1_3_SPH_2($data);
        } else if ($data['cyl'] <= 3) {
            $index_valid = type_1_3_SPH_3($data);
        } else if ($data['cyl'] <= 4) {
            $index_valid = type_1_3_SPH_4($data);
        }
        return $index_valid;
    }

    function validation_one_eyes_type_2($data) {
        var $index_valid;

        if ($data['cyl'] <= 2) {
            $index_valid = type_2_SPH_2($data);
        } else if ($data['cyl'] <= 3) {
            $index_valid = type_2_SPH_3($data);
        } else if ($data['cyl'] <= 4) {
            $index_valid = type_2_SPH_4($data);
        }
        return $index_valid;
    }

// VALIDATION IF TYPE 1 || 3 && CYL == 2
    function type_1_3_SPH_2($data) {
        var $index_valid;
        //check sph have - || + polar
        if ($data['sph'] <= 0) {
            $index_valid = type_1_3_SPH_m2_diapasone(Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_1_3_SPH_p2_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }

    function type_1_3_SPH_m2_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 4) {
            $index_valid['1.50'] = $data[2]['1.50'];
        }
        if ($sph <= 8) {
            $index_valid['1.56'] = $data[2]['1.56'];
            $index_valid['1.61'] = $data[2]['1.61'];
        }
        if ($sph <= 15) {
            if ($sph >= 3) {
                $index_valid['1.67'] = $data[2]['1.67'];
            }
            if ($sph >= 4) {
                $index_valid['1.74'] = $data[2]['1.74'];
            }
        }

        return $index_valid;
    }

    function type_1_3_SPH_p2_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.50'] = $data[2]['1.50'];
            $index_valid['1.56'] = $data[2]['1.56'];
            $index_valid['1.61'] = $data[2]['1.61'];
            if ($sph >= 1) {
                $index_valid['1.67'] = $data[2]['1.67'];
            }
            if ($sph >= 3) {
                $index_valid['1.74M'] = $data[2]['1.74M'];
            }
        }
        return $index_valid;
    }


// VALIDATION IF TYPE 1 || 3 && CYL == 3

    function type_1_3_SPH_3($data) {
        var $index_valid;
        if ($data['sph'] <= 0) {
            $index_valid = type_1_3_SPH_m3_diapasone(Math.Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_1_3_SPH_p3_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }

    function type_1_3_SPH_m3_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.50'] = $data[3]['1.50'];
            $index_valid['1.56'] = $data[3]['1.56'];
        }
        if ($sph <= 8) {
            $index_valid['1.61'] = $data[3]['1.61'];
            if ($sph >= 3) {
                $index_valid['1.67'] = $data[3]['1.67'];
            }
            if ($sph >= 4) {
                $index_valid['1.74'] = $data[3]['1.74'];
            }
        }
        if ($sph >= 8.25 && $sph <= 12) {
            $index_valid['1.61M'] = $data[3]['1.61M'];
        }
        if ($sph >= 8.25 && $sph <= 15) {
            $index_valid['1.67M'] = $data[3]['1.67M'];
            $index_valid['1.74M'] = $data[3]['1.74M'];
        }
        return $index_valid;
    }

    function type_1_3_SPH_p3_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 3) {
            $index_valid['1.50'] = $data[3]['1.50'];
        }
        if ($sph <= 4) {
            $index_valid['1.56'] = $data[3]['1.56'];
        }
        if ($sph <= 6) {
            $index_valid['1.61M'] = $data[3]['1.61M'];
            if ($sph >= 2) {
                $index_valid['1.67M'] = $data[3]['1.67M'];
            }
            if ($sph >= 3) {
                $index_valid['1.74M'] = $data[3]['1.74M'];
            }
            if ($sph >= 4.25) {
                $index_valid['1.56M'] = $data[3]['1.56M'];
            }
        }
        return $index_valid;
    }

// VALIDATION IF TYPE 1 || 3 && CYL == 4

    function type_1_3_SPH_4($data) {
        var $index_valid;
        if ($data['sph'] <= 0) {
            $index_valid = type_1_3_SPH_m4_diapasone(Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_1_3_SPH_p4_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }

    function type_1_3_SPH_m4_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 4) {
            $index_valid['1.61'] = $data[4]['1.61'];
        }
        if ($sph <= 6) {
            $index_valid['1.56'] = $data[4]['1.56'];
        }
        if ($sph <= 8) {
            if ($sph >= 3) {
                $index_valid['1.67'] = $data[4]['1.67'];
            }
            if ($sph >= 4) {
                $index_valid['1.74'] = $data[4]['1.74'];
            }
            if ($sph >= 6.25) {
                $index_valid['1.56M'] = $data[4]['1.56M'];
            }
        }
        if ($sph <= 12 && $sph >= 4.25) {
            $index_valid['1.61M'] = $data[4]['1.61M'];
        }
        if ($sph <= 15 && $sph >= 8.25) {
            $index_valid['1.67M'] = $data[4]['1.67'];
            $index_valid['1.74M'] = $data[4]['1.74M'];
        }
        return $index_valid;
    }

    function type_1_3_SPH_p4_diapasone($sph) {
        var $data = type_1_3_index_price();
        var $index_valid = {};
        if ($sph <= 4) {
            $index_valid['1.56'] = $data[4]['1.56'];
        }
        if ($sph <= 6) {
            $index_valid['1.61M'] =
                $index_valid['1.56'] = $data[4]['1.61M'];
            if ($sph >= 2) {
                $index_valid['1.67M'] = $data[4]['1.67M'];
            }
            if ($sph >= 3) {
                $index_valid['1.74M'] = $data[4]['1.74M'];
            }
            if ($sph >= 4.25) {
                $index_valid['1.56M'] = $data[4]['1.56M'];
            }
        }
        return $index_valid;
    }

// VALIDATION IF TYPE 2 && CYL == 2
    function type_2_SPH_2($data) {
        var $index_valid;

        //check sph have - || + polar
        if ($data['sph'] <= 0) {
            $index_valid = type_2_SPH_m2_diapasone(Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_2_SPH_p2_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }


    function type_2_SPH_m2_diapasone($sph) {
        var $index_data = type_2_index_price();
        var $index_valid = {};
        if ($sph <= 4) {
            $index_valid['1.56'] = $index_data[2]['1.56'];
        }
        if ($sph <= 6) {
            $index_valid['1.60'] = $index_data[2]['1.60'];
        }
        if ($sph >= 6.25 && $sph <= 8) {
            $index_valid['1.60M'] = $index_data[2]['1.60M'];
        }
        if ($sph >= 1 && $sph <= 12) {
            $index_valid['1.67M'] = $index_data[2]['1.67M'];
        }
        return $index_valid;
    }

    function type_2_SPH_p2_diapasone($sph) {
        var $index_data = type_2_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.56M'] = $index_data[2]['1.56M'];
            $index_valid['1.60M'] = $index_data[2]['1.60M'];
            if ($sph >= 1) {
                $index_valid['1.67'] = $index_data[2]['1.67'];
            }
        }
        return $index_valid;
    }

//VALIDATION IF TYPE 2 && CYL 3
    function type_2_SPH_3($data) {
        var $index_valid;
        //check sph have - || + polar
        if ($data['sph'] <= 0) {
            $index_valid = type_2_SPH_m3_diapasone(Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_2_SPH_p3_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }

    function type_2_SPH_m3_diapasone($sph) {
        var $index_data = type_2_index_price();

        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.56M'] = $index_data[3]['1.56M'];
            $index_valid['1.60'] = $index_data[3]['1.60'];
        }
        if ($sph >= 6.25 && $sph <= 8) {
            $index_valid['1.60M'] = $index_data[3]['1.60M'];
        }
        if ($sph >= 1 && $sph <= 12) {
            $index_valid['1.67M'] = $index_data[3]['1.67M'];
        }
        return $index_valid;
    }

    function type_2_SPH_p3_diapasone($sph) {
        var $index_data = type_2_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.56M'] = $index_data[3]['1.56M'];
            $index_valid['1.60M'] = $index_data[3]['1.60M'];
            if ($sph >= 1) {
                $index_valid['1.67M'] = $index_data[3]['1.67M'];
            }
        }
        return $index_valid;
    }

//VALIDATION IF TYPE 2 && CYL 4
    function type_2_SPH_4($data) {
        var $index_valid;
        //check sph have - || + polar
        if ($data['sph'] <= 0) {
            $index_valid = type_2_SPH_m4_diapasone(Math.abs($data['sph']));
            return $index_valid;
        } else if ($data['sph'] >= 0) {
            $index_valid = type_2_SPH_p4_diapasone($data['sph']);
            return $index_valid;
        } else {
            return {'success': false, 'text': 'incorrect sph polar'};
        }
    }

    function type_2_SPH_m4_diapasone($sph) {
        var $index_data = type_2_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.56M'] = $index_data[4]['1.56M'];
        }
        if ($sph <= 8) {
            $index_valid['1.60M'] = $index_data[4]['1.60M'];
        }
        if ($sph >= 1 && $sph <= 12) {
            $index_valid['1.67M'] = $index_data[4]['1.67M'];
        }
        return $index_valid;
    }

    function type_2_SPH_p4_diapasone($sph) {
        var $index_data = type_2_index_price();
        var $index_valid = {};
        if ($sph <= 6) {
            $index_valid['1.56M'] = $index_data[4]['1.56M'];
            $index_valid['1.60M'] = $index_data[4]['1.60M'];
            if ($sph >= 1) {
                $index_valid['1.67M'] = $index_data[4]['1.67M'];
            }
        }
        return $index_valid;
    }

    return {
        valid: function() {
            var validation = validation_data(),
                result = {};

            if (validation.valid) {

                result['success'] = true;
                result['data'] = validation.indexes_lens;

            } else {

                result['success'] = false;
                result['text'] = validation.text;

            }

            return result;
        }
    };
}
