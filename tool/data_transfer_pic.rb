# -*- coding: utf-8 -*-
require 'json'
ROOT     = File.expand_path(File.join(File.dirname(__FILE__), '..'))
src_dir  = "#{ROOT}/tool/resource"
dist_dir = "#{ROOT}/data"

SCENE    = "---scene-"
BACKGROUND = "----bg"
CHARACTER  = "----chara"

SCENE_TYPE_NORMAL   = 0
SCENE_TYPE_QUESTION = 1

# return chunk = {scene_id => [line,....]}
def split_scene(str)
  line_list = str.split("\n").map{|s| s.strip}
  chunk = {}
  before_key = ""
  line_list.each do |line|
    if line =~ /^#{SCENE}.*/
      before_key = line.gsub(/#{SCENE}/, '')
      chunk[before_key] = []
    else
      chunk[before_key] << line unless line == ""
    end
  end
  chunk
end

def separate_scene_info(scene_info)
  ret = {
    "background" => "",
    "character"  => "",
  }
  before_key = ""
  scene_info.each_with_index do |line, i|
    if line =~ /^#{BACKGROUND}/
      before_key = "background"
    elsif line =~ /^#{CHARACTER}/
      before_key = "character"
    else
      ret[before_key] = line
      # case before_key
      # when "background"
      #   ret[before_key] = line
      # when "select"
      #   key, value = line.split(" ")
      #   ret[before_key][key] = value
      # when "answer"
      #   ret[before_key] = line
      # else
      #   puts "error"
      # end
    end
  end

  # type = SCENE_TYPE_NORMAL
  # unless ret["question"].empty?
  #   type = SCENE_TYPE_QUESTION
  # end
  # ret["type"] = type
  #p ret
  ret
end



# src_dir以下のファイル一覧取得
file_list = Dir.glob("#{src_dir}/*")

# データファイルを読み込み、parseする
file_list.each do |file|
  next unless File.file?(file)
  src = File.open(file).read

  # とりあえず stage1だけ
  tmp = file.split("/").last
#  unless tmp == "stage1_pic.txt"
  unless tmp =~ /_pic/
    next;
  end

  puts file

  ret = {}
  scene_list = split_scene(src)
  scene_list.each do |id, info|
    ret[id] = separate_scene_info(info)
  end

  output_file = dist_dir + "/" + file.split("/").last.gsub(/\.txt/, '') + ".json"
  puts output_file
#  File.write(output_file, JSON.generate(ret))
end





